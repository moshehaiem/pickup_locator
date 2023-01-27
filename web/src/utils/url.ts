import { UrlParams } from "../types/url-types";

export const encodeUrlParams = (query: UrlParams): string =>
  Object.entries(query).map(param => param.map(encodeURIComponent).join('=')).join('&');


export const getUrlParams = (url: string): UrlParams => {
  const u = new URL(url);
  const urlEntries = new URLSearchParams(u.search).entries();
  const urlParams: UrlParams = {};
  let hasMoreParams = true;
  while (hasMoreParams) {
    const { value, done } = urlEntries.next();
    if (!done) {
      const [param, val] = value;
      urlParams[param] = val;
    }
    hasMoreParams = !done;
  }
  return urlParams;
}