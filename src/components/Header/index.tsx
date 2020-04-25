import React from "react";
import "./index.scss";

const Header: React.FC = () => {
  return (
    <div className="wrapper--header">
      <header>
        <h1>Demo API Frontend</h1>
        <p>
          This is a simple web app meant to demonstrate basic CRUD
          functionality.
        </p>
      </header>
    </div>
  );
};

export default Header;
