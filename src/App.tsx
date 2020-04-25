import React from "react";
import Header from "./components/Header";
import DisplayTable from "./components/DisplayTable";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="wrapper--main">
      <Header />
      <DisplayTable />
    </div>
  );
};

export default App;
