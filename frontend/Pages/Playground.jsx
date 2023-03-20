import { useRef } from "react";

import { Row, Col } from "antd";

import { useParams } from "react-router-dom";

import { FolderStructure } from "../Components/FolderStructure";
import { Shell } from "../Components/Shell";
import { EditorComponent } from "../Components/EditorComponent";
import { EditorTabs } from "../Components/EditorTabs";

import folderStructureStore from "../Store/folderStructureStore";
import activeTabStore from "../Store/activeTabStore";
import websocketStore from "../Store/websocketStore";

export const Playground = () => {
  const browser = useRef(null);

  const { playgroundId } = useParams();

  const setFolderStructure = folderStructureStore(
    (state) => state.setFolderStructure
  );
  const setActiveTab = activeTabStore((state) => state.setActiveTab);

  const setWs = websocketStore((state) => state.setWs);

  setFolderStructure(playgroundId);

  const ws = new WebSocket("ws://localhost:3000/?playgroundId=" + playgroundId);

  ws.onopen = () => {
    setWs(ws);
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      switch (data.type) {
        case "readFile":
          const payload = data.payload.data;
          const path = data.payload.path;
          setActiveTab(path, "javascript", payload);
          break;
      }
    };
  };

  const handleRefresh = () => {
    browser.current.src = browser.current.src;
  };

  return (
    ws && (
      <Row>
        <Col
          style={{
            paddingRight: "10px",
            // minWidth: "12vw",
            // maxWidth: "15vw",
            maxHeight: "100vh",
            backgroundColor: "#22212c",
            fontFamily: "Roboto, sans-serif",
          }}
          xxl={3}
        >
          <FolderStructure />
        </Col>
        <Col xxl={16} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ borderBottom: "1px solid #bd93f9" }}>
            <EditorTabs />
            <EditorComponent />
          </div>
          <Shell />
        </Col>
        <Col xxl={5}>
          <button onClick={handleRefresh}>Refresh</button>
          <iframe
            ref={browser}
            width="99%"
            height="97%"
            src="http://localhost:8000"
          />
        </Col>
      </Row>
    )
  );
};
