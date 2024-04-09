import {
  redirect,
  type MetaFunction,
  json,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { destinationSearch } from "~/actions/agoda.action";

import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { ICity, createMany, searchCity } from "~/models/destionation.server";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await authenticator.isAuthenticated(request);
  return json({
    isAuthenticated: !!isAuthenticated,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  /** @type {any} */
  const _data = {
    ...Object.fromEntries(await request.formData()),
  };

  if (request.method === "PUT") {
    if (_data.keywords !== "") {
      let citys = await searchCity(_data.keywords as string);
      if (citys.length === 0) {
        const { data } = await destinationSearch(_data.keywords as string);
        citys = (await data.textSearchResults)
          .filter(
            (destionation: ICity) =>
              destionation.typeName === "City" &&
              destionation.country === "Indonesia"
          )
          .map((destionation: ICity) => ({
            city: destionation.city,
            cityId: destionation.cityId,
            typeName: destionation.typeName,
            country: destionation.country,
            tags: [destionation.city.toLocaleLowerCase()],
          }));
        await createMany(citys);
      }
      return json({ citys });
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
