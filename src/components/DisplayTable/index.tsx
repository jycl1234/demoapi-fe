import React, { useEffect } from "react";
import callEndpoint, { IOptions } from "../../fetch";

const options: IOptions = {
  type: "",
};

const DisplayTable: React.FC = () => {
  useEffect(() => {
    const test = callEndpoint(options);
    console.log(test);
  }, []);

  return <div className="wrapper--table"></div>;
};

export default DisplayTable;
