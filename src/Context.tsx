import React, { createContext } from "react";

import { GlobalState } from "./Interfaces";

export const initState: GlobalState = {
  data: [],
  currentItem: null,
  hasError: false,
  inputVals: { id: "", name: "" },
  error: { hasError: false, errMsg: "" },
  showFields: { showItemId: false, showItemName: false },
};

export const StateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<any>;
}>({
  state: initState,
  dispatch: () => null,
});
