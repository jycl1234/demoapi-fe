import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { $apiEndpoint } from "./constants";

export interface IOptions extends AxiosRequestConfig {
  type: string;
}

function apiCall(options: IOptions): Promise<AxiosResponse> {
  const client = axios.create({
    url: $apiEndpoint,
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
