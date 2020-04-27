import React, { useContext } from "react";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StateContext } from "../../../../Context";
import { operationIconStyles } from "../../../../constants";

import "./styles.scss";

const ColumnOperations: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { currentItem } = state;

  // TODO: parent event to select row not fired when icons clicked
  // leading to desynced state

  const handleEdit = (e: any): void => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { actionType: "updateItem" },
    });
  };

  const handleDelete = (): void => {
    console.log(currentItem);
    // dispatch({ type: "DELETE_ITEM", payload: "" });
  };
  return (
    <div className="wrapper--operations">
      <EditOutlined
        className="icon--operations"
        style={operationIconStyles}
        onClick={(e: any) => {
          handleEdit(e);
        }}
      />
      <Popconfirm
        title="Are you sure you want to delete this row?"
        onConfirm={handleDelete}
      >
        <DeleteOutlined
          className="icon--operations"
          style={operationIconStyles}
        />
      </Popconfirm>
    </div>
  );
};
export default ColumnOperations;
