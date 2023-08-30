import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Row, Input } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

import portStore from "../Store/portStore";
import shellSocketStore from "../Store/shellSocketStore";
import websocketStore from "../Store/websocketStore";

export const BrowserComponent: React.FC = () => {
  const { playgroundId } = useParams();

  const port = portStore((state) => state.port);
  const wsForShell = shellSocketStore((state) => state.wsForShell);
  const ws = websocketStore((state) => state.ws);

  const browser = useRef<HTMLIFrameElement>(null);
  const inputRef = useRef(null);

  const handleRefresh = () => {
    if (browser.current) browser.current.src = browser.current.src;
  };

  useEffect(() => {
    //@ts-ignore:disable-next-line
    if (port && inputRef.current) inputRef.current.input.style.color = "white";
  }, [port]);

  if (wsForShell) {
    const message = {
      type: "registerPort",
      payload: {
        data: playgroundId,
      },
    };
    ws?.send(JSON.stringify(message));
  }

  return port ? (
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
          height: "30px",
          fontFamily: "Ubuntu Mono, monospace",
        }}
      />
      <iframe
        frameBorder={0}
        ref={browser}
        src={`http://localhost:${port}`}
        style={{ width: "100%", height: "97vh" }}
      />
    </Row>
  ) : (
    <h3>Loading...</h3>
  );
};
