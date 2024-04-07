import {
  redirect,
  type MetaFunction,
  json,
  ActionFunctionArgs,
} from "@remix-run/node";
import axios from "axios";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  /** @type {any} */
  const _data = {
    ...Object.fromEntries(await request.formData()),
  };

  if (request.method === "PUT") {
    if (_data.keywords !== "") {
      const { data } = await axios.post(
        "https://www.agoda.com/api/gw/TextSearch/Search",
        {
          query: _data.keywords,
          context: {
            userSettings: {
              currencyCode: "IDR",
              language: "en-us",
            },
            sessionInfo: {
              cid: 1891460,
              id: "ddbbcwllfb0zvptphpfdpehd",
              searchEngineClicks: {
                gclid:
                  "EAIaIQobChMIpMa8lb2phQMVUqRmAh2pfgipEAAYASAAEgJ01fD_BwE",
              },
            },
            debugInfo: {
              overrideExperiments: [],
            },
            trafficMessageInfo: {
              shouldSendTrafficMessage: true,
              pageId: 1,
            },
            funnel: 0,
            clientInfo: {
              userId: "ef4ff1eb-6d8a-41e6-b4e5-553aeebc92f4",
              applicationName: "MobileWeb",
              clientVersion: "1.0",
            },
            requestInfo: {
              currentRetryAttempt: 0,
              pollingId: "",
              requestId: "23c6e6fc-9ffc-4eaa-ba5f-d1b6306a7abb",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return json({
        citys: data.textSearchResults as {
          name: string;
          id: number;
          cityId: number;
          country: string;
          city: string;
          typeName: string;
        }[],
      });
    }
  } else if (_data.cityId && _data.cityId !== "") {
    const cityName = _data.keywords;
    delete _data.keywords;
    return redirect(
      `/${cityName}?${Object.entries(_data)
        .map((e) => e.join("="))
        .join("&")}`
    );
  }

  return json({
    citys: [] as {
      name: string;
      id: number;
      cityId: number;
      country: string;
      city: string;
      typeName: string;
    }[],
  });
};

export default function Index() {
  return (
    <div className="flex flex-col w-screen h-screen sm:bg-desktop bg-mobile bg-cover">
      <div className="fixed inset-0 bg-[#024F55] opacity-[46%]"></div>
      <Header />
      <Section />
      <Footer />
    </div>
  );
}
