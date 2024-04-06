import httpAgoda from "./http-agoda";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function citySearch(data: any) {
  return await httpAgoda.post("/affiliateservice/lt_v1", data);
}
