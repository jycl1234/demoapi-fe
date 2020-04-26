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

interface Inputs {
  id: string;
  name: string;
}

interface Error {
  hasError: boolean;
  errMsg: string;
}

interface ShowFields {
  showItemId: boolean;
  showItemName: boolean;
}

export interface GlobalState {
  data: Items;
  currentItem: Item | null;
  hasError: boolean;
  inputVals: Inputs;
  error: Error;
  showFields: ShowFields;
}
