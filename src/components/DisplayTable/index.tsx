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

const regexNum = /^[0-9]+$/;
// const regexAlphaNum = /^[a-zA-Z0-9]+$/;

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

  const resetData = (): void => {
    showHasError(false);
    setData(undefined);
  };

  const getAll = async (): Promise<any> => {
    resetData();
    const result: Items = await callApi("getAll", null);
    setData(result);
  };

  const getMaxPrices = async (): Promise<any> => {
    resetData();
    const result: Items = await callApi("getMaxPrices", null);
    setData(result);
  };

  const getById = async (): Promise<any> => {
    resetData();
    const id = itemIdRef.current?.state.value;
    if (!id || id.search(regexNum) === -1) {
      showHasError(true);
    } else {
      const result: Item = await callApi("getById", id);
      if (result) {
        setData([result]);
      }
    }
  };

  return (
    <>
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
        </Col>
      </Row>
    </>
  );
};

export default DisplayTable;
