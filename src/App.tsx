import React, { useReducer } from "react";
import Header from "./components/Header";
import DisplayTable from "./components/DisplayTable";
import { initState, StateContext } from "./Context";
import reducer from "./reducer";
import "./App.scss";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="wrapper--main">
        <Header />
        <DisplayTable />
      </div>
    </StateContext.Provider>
  );
};

export default App;
