import React from "react";
import { Row, Col } from "antd";

const ErrorMessage: React.FC = () => {
  return (
    <Row>
      <Col xs={24} className="wrapper--error">
        <div className="error-outer">
          <span>Please enter a valid input.</span>
        </div>
      </Col>
    </Row>
  );
};

export default ErrorMessage;
