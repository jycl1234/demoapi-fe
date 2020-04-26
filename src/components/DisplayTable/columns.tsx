import React from "react";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { operationIconStyles } from "../../constants";

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
    title: "Modsify",
    width: "10%",
    render: () => {
      return (
        <div className="wrapper--operations">
          <EditOutlined
            className="icon--operations"
            style={operationIconStyles}
          />
          <Popconfirm title="Are you sure you want to delete this row?">
            <DeleteOutlined
              className="icon--operations"
              style={operationIconStyles}
            />
          </Popconfirm>
        </div>
      );
    },
  },
];
