import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { columns } from "./columns";
import callEndpoint, { IOptions } from "../../fetch";

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

  useEffect(() => {
    async function initTable() {
      const result: Items = await callApi("getAll");
      setData(result);
    }
    initTable();
  }, []);

  return (
    <div className="wrapper--table">
      <Table
        className="item--table"
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

export default DisplayTable;
