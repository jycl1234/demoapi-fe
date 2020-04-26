import React from "react";
import { Row, Col } from "antd";

interface IError {
  message: string | null | undefined;
}

const ErrorMessage: React.FC<IError> = ({ message }) => {
  return (
    <Row>
      <Col xs={24} className="wrapper--error">
        <div className="error-outer">
          <span>{message}</span>
        </div>
      </Col>
    </Row>
  );
};

export default ErrorMessage;
