import { UrlParamaters } from "../types/General";

export const createUrlParameters = (urlParameters: UrlParamaters): string =>
  Object.entries(urlParameters)
    .map(keyValue => keyValue.map(encodeURIComponent).join('='))
    .join('&');