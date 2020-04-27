import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { $apiEndpoint } from "./constants";

import { IOptions } from "./Interfaces";

function apiCall(options: IOptions): Promise<AxiosResponse> {
  axios.defaults.headers.post["Accept"] = "application/json";

  let reqOptions: AxiosRequestConfig;
  const { type, data } = options;
  switch (type) {
    case "getAll":
      reqOptions = {
        method: "GET",
        url: $apiEndpoint,
      };
      break;
    case "getMaxPrices":
      reqOptions = {
        method: "GET",
        url: $apiEndpoint + "getmaxprices",
      };
      break;
    case "getById":
      reqOptions = {
        method: "GET",
        url: $apiEndpoint + "getitem/" + data,
      };
      break;
    case "getMaxByItemName":
      reqOptions = {
        method: "GET",
        url: $apiEndpoint + "getmaxprice/" + data,
      };
      break;
    case "addItem":
      reqOptions = {
        method: "POST",
        url: $apiEndpoint + "add",
        data,
      };
      break;
    case "updateItem":
      reqOptions = {
        method: "POST",
        url: $apiEndpoint + "update",
        data,
      };
      break;
    case "deleteItem":
      reqOptions = {
        method: "POST",
        url: $apiEndpoint + "delete/" + data,
        data,
      };
      break;
    default:
      reqOptions = {};
      break;
  }

  const client = axios.create(reqOptions);

  const onSuccess = (response: any): any => {
    return response.data;
  };
  const onError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error.response || error.message);
  };
  return client(options).then(onSuccess).catch(onError);
}

export default function callEndpoint(options: IOptions): Promise<any> {
  return apiCall(options).then((response) => response);
}
