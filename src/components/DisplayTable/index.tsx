import React, { useEffect, useContext } from "react";
import { Table, Input, Row, Col, Tooltip } from "antd";
import {
  ReloadOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  FileSearchOutlined,
  CloseCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { StateContext } from "../../Context";
import ErrorMessage from "./components/ErrorMessage";
import OperationsModal from "./components/Modal";
import { columns } from "./columns";
import { callApi } from "../../callApi";

import {
  controlIconStyles,
  subIconStyles,
  regexAlphaNum,
  regexNum,
} from "../../constants";

import { IApiResponse } from "../../Interfaces";

import "./index.scss";

const DisplayTable: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const { data } = state;
  const {
    error: { hasError, errMsg },
  } = state;
  const {
    inputVals: { id, name },
  } = state;
  const {
    showFields: { showItemId, showItemName },
  } = state;

  const resetData = (): void => {
    dispatch({ type: "RESET_DATA" });
  };

  const resetFields = (): void => {
    dispatch({ type: "RESET_FIELDS" });
  };

  const setCurrentRow = (record: any): void => {
    console.log("set current row", record);
    dispatch({ type: "SET_CURRENT_ROW", payload: record });
  };

  const showItemIdField = (): void => {
    dispatch({ type: "SHOW_ITEM_ID_FIELD" });
  };

  const showItemNameField = (): void => {
    dispatch({ type: "SHOW_ITEM_NAME_FIELD" });
  };

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INPUT_VALUE", payload: { name, value } });
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

  const getMaxPrices = async (): Promise<any> => {
    resetData();
    const { success, response }: IApiResponse = await callApi(
      "getMaxPrices",
      null
    );
    if (success) {
      dispatch({ type: "GET_MAX_PRICES", payload: response });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { hasError: true, errMsg: "Error fetching maximum prices." },
      });
    }
  };

  const getById = async (): Promise<any> => {
    if (!id || id.search(regexNum) === -1) {
      dispatch({
        type: "SET_ERROR",
        payload: { hasError: true, errMsg: "Please use numbers only." },
      });
    } else {
      resetData();
      const { success, response }: IApiResponse = await callApi("getById", id);
      if (success) {
        dispatch({ type: "GET_BY_ID", payload: response });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: {
            hasError: true,
            errMsg: `Item with id ${id} was not found.`,
          },
        });
      }
    }
  };

  const getMaxByItemName = async (): Promise<any> => {
    if (!name) {
      dispatch({
        type: "SET_ERROR",
        payload: { hasError: true, errMsg: "Please enter an item name." },
      });
    } else {
      resetData();
      if (name.search(regexAlphaNum) === -1) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            hasError: true,
            errMsg: "Please use only alphanumeric characters.",
          },
        });
      } else {
        const { success, response }: IApiResponse = await callApi(
          "getMaxByItemName",
          name.toUpperCase()
        );
        if (success) {
          alert(`The max price for ${name} is ${response}.`);
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: { hasError: true, errMsg: `${name} was not found.` },
          });
        }
      }
    }
  };

  const handleAdd = async (): Promise<any> => {
    dispatch({ type: "RESET_DATA" });
    dispatch({
      type: "OPEN_MODAL",
      payload: { actionType: "addItem" },
    });
  };

  useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper--outer">
      <OperationsModal />
      {hasError ? <ErrorMessage message={errMsg} /> : null}
      <Row>
        <Col xs={2}>
          <Tooltip title="Add Row">
            <PlusOutlined
              className="icon--control"
              style={controlIconStyles}
              onClick={handleAdd}
            />
          </Tooltip>
        </Col>
        <Col xs={22} className="wrapper--controls">
          <div className="wrapper--control">
            <Tooltip title="Get All Values">
              <ReloadOutlined
                className="icon--control"
                style={controlIconStyles}
                onClick={getAll}
              />
            </Tooltip>
          </div>
          <div className="wrapper--control">
            <Tooltip title="Get Max Prices Sorted by Item Name">
              <SortAscendingOutlined
                className="icon--control"
                style={controlIconStyles}
                onClick={getMaxPrices}
              />
            </Tooltip>
          </div>
          <div className="wrapper--control">
            <Tooltip title="Find Item by Id">
              <SearchOutlined
                className="icon--control"
                style={{ fontSize: "1.6rem", color: "#264988" }}
                onClick={() => {
                  showItemIdField();
                }}
              />
            </Tooltip>
          </div>
          <div className="wrapper--control">
            <Tooltip title="Get Max Price By Item Name">
              <FileSearchOutlined
                className="icon--control"
                style={{ fontSize: "1.6rem", color: "#264988" }}
                onClick={() => {
                  showItemNameField();
                }}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Row className="wrapper--inputs">
        <Col xs={24}>
          {showItemId ? (
            <div className="wrapper--sub-controls">
              <Input
                name="id"
                className="input--control get-by-id"
                value={id}
                onChange={handleInputChange}
                placeholder="Enter id"
              />
              <SearchOutlined
                className="icon--sub"
                style={subIconStyles}
                onClick={getById}
              />
              <CloseCircleOutlined
                className="icon--sub"
                style={subIconStyles}
                onClick={resetFields}
              />
            </div>
          ) : null}
          {showItemName ? (
            <div className="wrapper--sub-controls">
              <Input
                name="name"
                className="input--control get-by-name"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
              <SearchOutlined
                className="icon--sub"
                style={subIconStyles}
                onClick={getMaxByItemName}
              />
              <CloseCircleOutlined
                className="icon--sub"
                style={subIconStyles}
                onClick={resetFields}
              />
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col xs={24} className="wrapper--table">
          <Table
            className="item--table"
            columns={columns}
            dataSource={data}
            size="small"
            rowKey={(record) => record.Id!}
            onRow={(record: any) => ({
              onClick: () => {
                setCurrentRow(record);
              },
            })}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DisplayTable;
