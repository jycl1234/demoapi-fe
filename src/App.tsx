import React from "react";
import Header from "./components/Header";
import DisplayTable from "./components/DisplayTable";
import UserControls from "./components/UserControls";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="wrapper--main">
      <Header />
      <DisplayTable />
      <UserControls />
    </div>
  );
};

export default App;
