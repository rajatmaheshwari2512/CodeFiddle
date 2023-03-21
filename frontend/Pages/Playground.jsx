import { Row, Col } from "antd";

import { useParams } from "react-router-dom";

import { FolderStructureComponent } from "../Components/FolderStructureComponent";
import { ShellComponent } from "../Components/ShellComponent";
import { EditorComponent } from "../Components/EditorComponent";
import { EditorTabsComponent } from "../Components/EditorTabsComponent";
import { BrowserComponent } from "../Components/BrowserComponent";

import folderStructureStore from "../Store/folderStructureStore";
import activeTabStore from "../Store/activeTabStore";
import websocketStore from "../Store/websocketStore";
import portStore from "../Store/portStore";

export const Playground = () => {
  const { playgroundId } = useParams();

  const setFolderStructure = folderStructureStore(
    (state) => state.setFolderStructure
  );
  const setActiveTab = activeTabStore((state) => state.setActiveTab);
  const setWs = websocketStore((state) => state.setWs);
  const setPort = portStore((state) => state.setPort);

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
        case "registerPort":
          const port = data.payload.port;
          setPort(port);
      }
    };
  };

  return (
    ws && (
      <Row>
        <Col
          style={{
            paddingRight: "10px",
            // minWidth: "12vw",
            // maxWidth: "15vw",
            height: "927px",
            backgroundColor: "#22212c",
            fontFamily: "Roboto, sans-serif",
            overflow: "auto",
          }}
          xxl={3}
        >
          <FolderStructureComponent />
        </Col>
        <Col
          xxl={16}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#282a36",
          }}
        >
          <div style={{ borderBottom: "1px solid #bd93f9" }}>
            <EditorTabsComponent />
            <EditorComponent />
          </div>
          <ShellComponent />
        </Col>
        <Col xxl={5}>
          <BrowserComponent />
        </Col>
      </Row>
    )
  );
};
