import React, { useState } from "react";
import { Table, Button } from "antd";
import "antd/dist/antd.css";
import { columns } from "./columns";
import callEndpoint, { IOptions } from "../../fetch";

import "./index.scss";

interface Item {
  id: number | null;
  itemName: string | null;
  cost: number | null;
}

interface Items extends Array<Item> {}

const DisplayTable: React.FC = () => {
  const callApi = async (type: string): Promise<any> => {
    const options: IOptions = {
      type,
    };
    let result = await callEndpoint(options);
    return result;
  };

  const [data, setData] = useState<Items>();

  const resetData = (): void => {
    setData(undefined);
  };

  const getAll = async (): Promise<any> => {
    resetData();
    const result: Items = await callApi("getAll");
    setData(result);
  };

  const getMaxPrices = async (): Promise<any> => {
    resetData();
    const result: Items = await callApi("getMaxPrices");
    setData(result);
  };

  return (
    <>
      <div className="wrapper--table">
        <Table
          className="item--table"
          columns={columns}
          dataSource={data}
          size="small"
          pagination={{
            defaultPageSize: 5,
            hideOnSinglePage: true,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
        />
      </div>
      <div className="wrapper--controls">
        <Button className="button--control" onClick={getAll}>
          Get All Values
        </Button>
        <Button className="button--control" onClick={getMaxPrices}>
          Get Max Prices Sorted by Item Name
        </Button>
      </div>
    </>
  );
};

export default DisplayTable;
