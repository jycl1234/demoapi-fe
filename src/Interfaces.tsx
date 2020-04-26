import { AxiosRequestConfig } from "axios";

export interface Item {
  Id: number | null;
  ItemName: string | null;
  Cost: number | null;
}

export interface Items extends Array<Item> {}

export interface IOptions extends AxiosRequestConfig {
  type: string;
  userInput: any;
}

export interface IApiResponse {
  success: boolean;
  response: any;
}

export interface IError {
  message: string | null | undefined;
}

interface inputs {
  id: string | null;
  name: string | null;
}

export interface GlobalState {
  data: Items | null;
  currentItem: Item | null;
  hasError: boolean;
  inputVals: inputs;
  errMsg: string | null;
  showItemId: boolean;
  showItemName: boolean;
}
