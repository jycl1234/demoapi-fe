const reducer = (state: any, action: any) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_ALL":
      return {
        ...state,
        data: payload,
      };
    case "GET_MAX_PRICES":
      return {
        ...state,
        data: payload,
      };
    case "GET_BY_ID":
      return {
        ...state,
        data: [payload],
      };
    case "SET_CURRENT_ROW":
      return {
        ...state,
        currentItem: payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          hasError: true,
          errMsg: payload.errMsg,
        },
      };
    case "SHOW_ITEM_ID_FIELD":
      return {
        ...state,
        showFields: {
          showItemId: true,
          showItemName: false,
        },
      };
    case "SHOW_ITEM_NAME_FIELD":
      return {
        ...state,
        showFields: {
          showItemId: false,
          showItemName: true,
        },
      };
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputVals: {
          [payload.name]: payload.value,
        },
      };
    case "RESET_FIELDS":
      return {
        ...state,
        inputVals: {
          id: "",
          name: "",
        },
      };
    case "RESET_DATA":
      return {
        ...state,
        showFields: {
          showItemId: false,
          showItemName: false,
        },
        inputVals: {
          id: "",
          name: "",
        },
        error: {
          hasError: false,
          errMsg: "",
        },
      };
    case "RESET_ITEMS":
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default reducer;
