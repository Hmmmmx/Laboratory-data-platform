import React from "react";
import { Row, Col } from "antd";
import RightContent from "./RightContent";

const HeaderComp: React.FC = () => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <div style={{
          lineHeight: '60px',
          fontSize: '27px',
          marginLeft:'10px',
        }}>元构件</div>
      </Col>
      <Col style={{ display: "flex" }}>
        <RightContent />
      </Col>
    </Row>
  );
};

export default HeaderComp;