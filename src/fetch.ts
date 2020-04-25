import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { $apiEndpoint } from "./constants";

export interface IOptions extends AxiosRequestConfig {
  type: string;
  userInput: any;
}

function apiCall(options: IOptions): Promise<AxiosResponse> {
  let url;
  const { type, userInput } = options;
  switch (type) {
    case "getAll":
      url = $apiEndpoint;
      break;
    case "getMaxPrices":
      url = $apiEndpoint + "getmaxprices";
      break;
    case "getById":
      url = $apiEndpoint + "getitem/" + userInput;
      break;
    default:
      break;
  }

  const client = axios.create({
    url,
  });

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
