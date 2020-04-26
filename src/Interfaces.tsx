import { AxiosRequestConfig } from "axios";

export interface Item {
  Id: string | null | undefined;
  ItemName: string | null | undefined;
  Cost: string | null | undefined;
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

interface IErrorMsg {
  hasError: boolean;
  errMsg: string;
}

interface IShowFields {
  showItemId: boolean;
  showItemName: boolean;
}

interface IOperations {
  modalOpen: boolean;
  item: Item;
}

export interface GlobalState {
  data: Items;
  currentItem: Item | null;
  inputVals: Inputs;
  error: IErrorMsg;
  showFields: IShowFields;
  operations: IOperations;
}
