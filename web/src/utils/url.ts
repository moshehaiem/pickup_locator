import { UrlParameters } from "../types/General";

export const createUrlParameters = (urlParameters: UrlParameters): string =>
  Object.entries(urlParameters)
    .map(keyValue => keyValue.map(encodeURIComponent).join('='))
    .join('&');