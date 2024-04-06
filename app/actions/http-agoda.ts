import axios from "axios";

export default axios.create({
  baseURL: "//affiliateapi7643.agoda.com",
  headers: {
    "Accept-Encoding": "gzip, deflate, br",
    Authorization: "1893251:918b985c-4fe5-4883-ad38-491600ce1206",
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});
