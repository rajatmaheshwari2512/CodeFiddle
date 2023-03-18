import axios from "axios";

import { Row, Col, Button } from "antd";

export const LandingPage = () => {
  const handleClick = () => {
    console.log("clicked");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api`).then((resp) => {
      console.log(resp.data);
    });
  };

  return (
    <Row>
      <Col xxl={5} xl={5} lg={5} md={3} xs={2} />
      <Col xxl={14} xl={14} lg={14} md={18} xs={20}>
        <Button
          type="primary"
          style={{ fontSize: "40px", padding: "100px", top: "33vh" }}
          onClick={handleClick}
        >
          Create Playground
        </Button>
      </Col>
      <Col xxl={5} xl={5} lg={5} md={3} xs={2} />
    </Row>
  );
};
