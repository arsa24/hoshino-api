import {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import axios from "axios";
import * as cheerio from "cheerio";

export const fetchWebsite = async (
  url: string,
  options: AxiosRequestConfig = {},
  headers: RawAxiosRequestHeaders = {}
) => {
  const response: AxiosResponse = await axios.get(url, {
    ...options,
    headers: { ...headers },
  });
  const data = await response.data;
  let $ = cheerio.load(data);
  return $;
};
