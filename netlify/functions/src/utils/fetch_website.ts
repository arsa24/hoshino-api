import { AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import * as cheerio from "cheerio";

export const fetchWebsite = async (url: string, options: AxiosRequestConfig = {}) => {
  const response: AxiosResponse = await axios.get(url, options);
  const data = await response.data;
  let $ = cheerio.load(data);
  return $;
};
