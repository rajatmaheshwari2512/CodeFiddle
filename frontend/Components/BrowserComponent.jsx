import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Row, Input } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import portStore from "../Store/portStore";
import shellSocketStore from "../Store/shellSocketStore";
import websocketStore from "../Store/websocketStore";

export const BrowserComponent = () => {
  const { playgroundId } = useParams();

  const port = portStore((state) => state.port);
  const wsForShell = shellSocketStore((state) => state.wsForShell);
  const ws = websocketStore((state) => state.ws);

  const browser = useRef(null);
  const inputRef = useRef(null);

  const handleRefresh = () => {
    browser.current.src = browser.current.src;
  };

  useEffect(() => {
    if (port) inputRef.current.input.style.color = "white";
  }, [port]);

  if (wsForShell) {
    const message = {
      type: "registerPort",
      payload: {
        data: playgroundId,
      },
    };
    ws.send(JSON.stringify(message));
  }

  return (
    port && (
      <Row style={{ backgroundColor: "#22212c" }}>
        <Input
          ref={inputRef}
          bordered={false}
          prefix={<ReloadOutlined onClick={handleRefresh} />}
          defaultValue={`http://localhost:${port}`}
          style={{
            width: "100%",
            backgroundColor: "#282a36",
            color: "white",
            height: "32px",
            fontFamily: "Ubuntu Mono, monospace",
          }}
        />
        <iframe
          frameBorder={0}
          ref={browser}
          src={`http://localhost:${port}`}
          style={{ width: "100%", height: "890px" }}
        />
      </Row>
    )
  );
};
