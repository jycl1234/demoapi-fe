import React, { useContext } from "react";
import { Modal, Col, Row, Input, Button } from "antd";
import { StateContext } from "../../../../Context";
import { callApi } from "../../../../callApi";

// import { regexAlphaNum, regexNum } from "../../constants";

import { IApiResponse } from "../../../../Interfaces";

import "./styles.scss";

const ItemModal: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    operations: {
      modalOpen,
      item: { Id, ItemName, Cost },
      actionType,
    },
  } = state;

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

  const handleSaveError = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({
      type: "SET_ERROR",
      payload: { hasError: true, errMsg: "Error saving data." },
    });
  };

  const handleChange = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    const payload = { name: e.target.name, value };
    dispatch({ type: "SET_MODAL_INPUT_VALUE", payload });
  };

  const handleSubmit = async (): Promise<any> => {
    let payload = {};
    switch (actionType) {
      case "addItem":
        payload = { ItemName, Cost: parseInt(Cost!) };
        break;
      case "editItem":
        payload = { Id: parseInt(Id!), ItemName, Cost: parseInt(Cost!) };
        break;
      default:
        break;
    }
    try {
      const { success }: IApiResponse = await callApi(actionType!, payload);
      if (success) {
        dispatch({ type: "CLOSE_MODAL" });
        getAll();
      } else {
        handleSaveError();
      }
    } catch {
      handleSaveError();
    }
  };

  const handleCancel = (): void => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <div data-testid="contact-modal">
      <Modal
        className="operations-modal"
        visible={modalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Row className="row--modal-header">
          <Col xs={8} className="wrapper--modal-field">
            Id
          </Col>
          <Col xs={8} className="wrapper--modal-field">
            Item Name
          </Col>
          <Col xs={8} className="wrapper--modal-field">
            Cost
          </Col>
        </Row>
        <Row className="row--modal-fields">
          <Col xs={8} className="wrapper--modal-field">
            <Input
              name="Id"
              className="input--modal id"
              value={Id!}
              disabled
              onChange={handleChange}
            />
          </Col>
          <Col xs={8} className="wrapper--modal-field">
            <Input
              name="ItemName"
              className="input--modal item-name"
              value={ItemName!}
              onChange={handleChange}
            />
          </Col>
          <Col xs={8} className="wrapper--modal-field">
            <Input
              name="Cost"
              className="input--modal cost"
              value={Cost!}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="row--modal-controls">
          <Col xs={24}>
            <Button
              className="button--modal-submit"
              type="primary"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default ItemModal;
