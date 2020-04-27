import React, { useContext } from "react";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { StateContext } from "../../../../Context";
import { callApi } from "../../../../callApi";
import { operationIconStyles } from "../../../../constants";

import { IApiResponse } from "../../../../Interfaces";

import "./styles.scss";

const ColumnOperations: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { currentItem } = state;

  // TODO: parent event to select row not fired when icons clicked
  // leading to desynced state

  const resetData = (): void => {
    dispatch({ type: "RESET_DATA" });
  };

  const getAll = async (): Promise<any> => {
    resetData();
    const { success, response }: IApiResponse = await callApi("getAll", null);
    if (success) {
      dispatch({ type: "GET_ALL", payload: response });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { hasError: true, errMsg: "Error fetching data." },
      });
    }
  };

  const handleSaveError = (errMsg: string): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({
      type: "SET_ERROR",
      payload: { hasError: true, errMsg },
    });
  };

  const handleEdit = (): void => {
    if (currentItem) {
      // const { Id, ItemName, Cost } = currentItem;
      const payload = { Id: 666, ItemName: "TEST", Cost: 666 };
      console.log(payload);
      dispatch({ type: "SET_MODAL_INPUT_VALUE", payload });
      dispatch({
        type: "OPEN_MODAL",
        payload: { actionType: "updateItem" },
      });
    }
  };

  const handleDelete = async (): Promise<any> => {
    if (currentItem) {
      const { Id } = currentItem;
      try {
        const { success }: IApiResponse = await callApi("deleteItem", Id);
        if (success) {
          dispatch({ type: "CLOSE_MODAL" });
          getAll();
        } else {
          handleSaveError("Error deleting item.");
        }
      } catch {
        handleSaveError("Error deleting item.");
      }
    }
  };
  return (
    <div className="wrapper--operations">
      <EditOutlined
        className="icon--operations"
        style={operationIconStyles}
        onClick={() => {
          handleEdit();
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
