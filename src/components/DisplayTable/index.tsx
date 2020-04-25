import React, { useState, useRef } from "react";
import { Table, Input, Button, Row, Col } from "antd";
import "antd/dist/antd.css";
import ErrorMessage from "./error";
import { columns } from "./columns";
import callEndpoint, { IOptions } from "../../fetch";

import "./index.scss";

interface Item {
  id: number | null;
  itemName: string | null;
  cost: number | null;
}

interface Items extends Array<Item> {}

interface IApiResponse {
  success: boolean;
  response: any;
}

const regexNum = /^[0-9]+$/;
const regexAlphaNum = /^[a-zA-Z0-9 ]+$/;

const DisplayTable: React.FC = () => {
  const callApi = async (type: string, userInput: any): Promise<any> => {
    const options: IOptions = {
      type,
      userInput,
    };
    let result = await callEndpoint(options);
    return result;
  };

  const [data, setData] = useState<Items>();
  const [hasError, showHasError] = useState(false);

  const itemIdRef = useRef<Input>(null);
  const itemNameRef = useRef<Input>(null);

  const resetData = (): void => {
    showHasError(false);
    setData(undefined);
  };

  const getAll = async (): Promise<any> => {
    resetData();
    const { success, response }: IApiResponse = await callApi("getAll", null);
    if (success) {
      setData(response);
    } else {
      alert(`Error fetching data.`);
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
      alert(`Error fetching maximum prices.`);
    }
  };

  const getById = async (): Promise<any> => {
    resetData();
    const id = itemIdRef.current?.state.value;
    if (!id || id.search(regexNum) === -1) {
      showHasError(true);
    } else {
      const { success, response }: IApiResponse = await callApi("getById", id);
      if (success) {
        setData([response]);
      } else {
        alert(`Item with id ${id} was not found.`);
      }
    }
  };

  const getMaxByItemName = async (): Promise<any> => {
    resetData();
    const name = itemNameRef.current?.state.value.toUpperCase();
    if (!name || name.search(regexAlphaNum) === -1) {
      showHasError(true);
    } else {
      const { success, response }: IApiResponse = await callApi(
        "getMaxByItemName",
        name
      );
      if (success) {
        alert(`The max price for ${name} is ${response}.`);
      } else {
        alert(`${name} was not found.`);
      }
    }
  };

  return (
    <div className="wrapper--outer">
      {hasError ? <ErrorMessage /> : null}
      <Row>
        <Col xs={12} className="wrapper--table">
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
        </Col>
        <Col xs={12} className="wrapper--controls">
          <div className="wrapper--control">
            <Button className="button--control" onClick={getAll}>
              Get All Values
            </Button>
          </div>
          <div className="wrapper--control">
            <Button className="button--control" onClick={getMaxPrices}>
              Get Max Prices Sorted by Item Name
            </Button>
          </div>
          <div className="wrapper--control">
            <Button className="button--control" onClick={getById}>
              Get By Id
            </Button>
            <Input className="input--control get-by-id" ref={itemIdRef} />
          </div>
          <div className="wrapper--control">
            <Button className="button--control" onClick={getMaxByItemName}>
              Get Max Price By Item Name
            </Button>
            <Input className="input--control get-by-name" ref={itemNameRef} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DisplayTable;
