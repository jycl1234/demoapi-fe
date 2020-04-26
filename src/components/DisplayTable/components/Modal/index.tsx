import React, { useContext } from "react";
import { Modal, Col, Row, Input, Button } from "antd";
import { StateContext } from "../../../../Context";

// import { regexAlphaNum, regexNum } from "../../constants";

const ItemModal: React.FC = () => {
  const { state, dispatch } = useContext(StateContext);
  const {
    operations: {
      modalOpen,
      item: { Id, ItemName, Cost },
    },
  } = state;

  const handleChange = (e: React.ChangeEvent<any>): void => {
    const { value } = e.target;
    const payload = { name: e.target.name, value };
    dispatch({ type: "SET_MODAL_INPUT_VALUE", payload });
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
            <Button className="modal-submit" type="primary">
              OK
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default ItemModal;
