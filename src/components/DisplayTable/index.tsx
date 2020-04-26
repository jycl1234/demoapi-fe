import React, { useEffect, useState, useContext } from "react";
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
import ErrorMessage from "./error";
import { columns } from "./columns";
import callEndpoint from "../../fetch";

import {
  controlIconStyles,
  subIconStyles,
  regexAlphaNum,
  regexNum,
} from "../../constants";

import { Item, Items, IApiResponse, IOptions } from "../../Interfaces";

import "./index.scss";

const DisplayTable: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);

  const callApi = async (type: string, userInput: any): Promise<any> => {
    const options: IOptions = {
      type,
      userInput,
    };
    let result = await callEndpoint(options);
    return result;
  };

  const [data, setData] = useState<Items>();
  const [errMsg, setErrMsg] = useState<string>();
  const [hasError, showHasError] = useState(false);
  const [inputVals, setInputVals] = useState({ id: "", name: "" });
  const [currentItem, setCurrentItem] = useState<Item>({
    Id: null,
    ItemName: "",
    Cost: null,
  });
  const [showItemIdField, setShowItemIdField] = useState(false);
  const [showItemNameField, setShowItemNameField] = useState(false);

  const hideFields = (): void => {
    setShowItemIdField(false);
    setShowItemNameField(false);
  };

  const resetFields = (): void => {
    setInputVals({ id: "", name: "" });
  };

  const resetData = (): void => {
    setErrMsg("");
    hideFields();
    showHasError(false);
    setData(undefined);
  };

  const handleInputChange = (e: React.ChangeEvent<any>): void => {
    const { name, value } = e.target;
    setInputVals({ ...inputVals, [name]: value });
  };

  const handleRowSelect = (record: any): void => {
    const { Id, ItemName, Cost } = record;
    // setCurrentItem({ Id, ItemName, Cost });
  };

  const getAll = async (): Promise<any> => {
    resetData();
    const { success, response }: IApiResponse = await callApi("getAll", null);
    if (success) {
      setData(response);
    } else {
      setErrMsg("Error fetching data.");
      showHasError(true);
    }
  };

  const getMaxPrices = async (): Promise<any> => {
    resetData();
    const { success, response }: IApiResponse = await callApi(
      "getMaxPrices",
      null
    );
    if (success) {
      setData(response);
    } else {
      setErrMsg("Error fetching maximum prices.");
      showHasError(true);
    }
  };

  const getById = async (): Promise<any> => {
    resetData();
    const { id } = inputVals;
    if (!id || id.search(regexNum) === -1) {
      setErrMsg("Please use numbers only.");
      showHasError(true);
    } else {
      const { success, response }: IApiResponse = await callApi("getById", id);
      if (success) {
        setData([response]);
      } else {
        setErrMsg(`Item with id ${id} was not found.`);
        showHasError(true);
      }
    }
  };

  const getMaxByItemName = async (): Promise<any> => {
    resetData();
    const { name } = inputVals;
    if (!name) {
      setErrMsg("Please enter an item name.");
      showHasError(true);
    } else {
      if (name.search(regexAlphaNum) === -1) {
        setErrMsg("Please use only alphanumeric characters.");
        showHasError(true);
      } else {
        const { success, response }: IApiResponse = await callApi(
          "getMaxByItemName",
          name.toUpperCase()
        );
        if (success) {
          alert(`The max price for ${name} is ${response}.`);
        } else {
          setErrMsg(`${name} was not found.`);
          showHasError(true);
        }
      }
    }
  };

  const handleAdd = async (): Promise<any> => {
    // const { success, response }: IApiResponse = await callApi("getAll", null);
    // if (success) {
    //   const newRow: Item = {
    //     Id: null,
    //     ItemName: null,
    //     Cost: null,
    //   };
    //   let newData: Items = response;
    //   newData.push(newRow);
    //   setData(newData);
    // } else {
    //   setErrMsg("Error fetching data.");
    //   showHasError(true);
    // }
  };

  useEffect(() => {
    getAll();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper--outer">
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
                  hideFields();
                  setShowItemIdField(true);
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
                  hideFields();
                  setShowItemNameField(true);
                }}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Row className="wrapper--inputs">
        <Col xs={24}>
          {showItemIdField ? (
            <div className="wrapper--sub-controls">
              <Input
                name="id"
                className="input--control get-by-id"
                value={inputVals.id}
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
          {showItemNameField ? (
            <div className="wrapper--sub-controls">
              <Input
                name="name"
                className="input--control get-by-name"
                value={inputVals.name}
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
            onRow={(record: any) => ({
              onClick: () => {
                dispatch({ type: "SET_CURRENT_ROW", payload: record });
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
