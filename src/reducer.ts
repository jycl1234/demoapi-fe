const reducer = (state: any, action: any) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case "SET_CURRENT_ROW":
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
