import React from "react";
import ColumnOperations from "./components/ColumnOperations";

export const columns = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "id",
    width: "20%",
  },
  {
    title: "Item Name",
    dataIndex: "ItemName",
    key: "itemName",
    width: "40%",
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    key: "cost",
    width: "30%",
  },
  {
    title: "Modify",
    width: "10%",
    render: (record: any) => {
      return <ColumnOperations record={record} />;
    },
  },
];
