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
    editable: true,
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    key: "cost",
    width: "30%",
    editable: true,
  },
  {
    title: "Modify",
    width: "10%",
    render: () => {
      return <ColumnOperations />;
    },
  },
];
