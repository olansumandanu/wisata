import axios from "axios";
import httpAgoda from "./http-agoda";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function citySearch(data: any) {
  return await httpAgoda.post("/affiliateservice/lt_v1", data);
}

export async function destinationSearch(keywords: string) {
  const data = {
    query: keywords,
    context: {
      userSettings: {
        currencyCode: "IDR",
        language: "en-us",
      },
      sessionInfo: {
        cid: 1891460,
        id: "ddbbcwllfb0zvptphpfdpehd",
        searchEngineClicks: {
          gclid: "EAIaIQobChMIpMa8lb2phQMVUqRmAh2pfgipEAAYASAAEgJ01fD_BwE",
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
  };
  return await axios.post(
    "https://www.agoda.com/api/gw/TextSearch/Search",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
