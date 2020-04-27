import React, { createContext } from "react";

import { GlobalState } from "./Interfaces";

export const initState: GlobalState = {
  data: [],
  currentItem: null,
  inputVals: { id: "", name: "" },
  error: { hasError: false, errMsg: "" },
  showFields: { showItemId: false, showItemName: false },
  operations: {
    modalOpen: false,
    actionType: "",
    item: {
      Id: "",
      ItemName: "",
      Cost: "",
    },
  },
};

export const StateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<any>;
}>({
  state: initState,
  dispatch: () => null,
});
