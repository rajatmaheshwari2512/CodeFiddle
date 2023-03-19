import { Row, Col } from "antd";

import { useParams } from "react-router-dom";

import { FolderStructure } from "../Components/FolderStructure";
import { Terminal } from "../Components/Terminal";
import { EditorComponent } from "../Components/EditorComponent";
import { EditorTabs } from "../Components/EditorTabs";

import folderStructureStore from "../Store/folderStructureStore";
import activeTabStore from "../Store/activeTabStore";
import websocketStore from "../Store/websocketStore";

export const Playground = () => {
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
        case "writeFile":
        case "deleteFile":
        case "createFolder":
        case "deleteFolder":
          break;
        case "error":
          console.log(data.payload);
        default:
          console.log("Unknown Event ", data);
      }
    };
  };

  return (
    ws && (
      <Row>
        <div
          style={{
            paddingRight: "10px",
            minWidth: "12vw",
            maxWidth: "15vw",
            minHeight: "100vh",
            backgroundColor: "#22212c",
          }}
        >
          <FolderStructure />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <EditorTabs />
          <EditorComponent />
          <Terminal />
        </div>
      </Row>
    )
  );
};
