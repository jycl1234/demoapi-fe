import callEndpoint from "./fetch";

import { IOptions } from "./Interfaces";

export const callApi = async (type: string, data: any): Promise<any> => {
  const options: IOptions = {
    type,
    data,
  };
  let result = await callEndpoint(options);
  return result;
};
