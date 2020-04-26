import React, { createContext } from "react";

import { GlobalState } from "./Interfaces";

export const initState: GlobalState = {
  data: null,
  currentItem: null,
  hasError: false,
  inputVals: { id: null, name: null },
  errMsg: null,
  showItemId: false,
  showItemName: false,
};

export const StateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<any>;
}>({
  state: initState,
  dispatch: () => null,
});
