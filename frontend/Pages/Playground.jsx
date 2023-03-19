import { Row, Col } from "antd";

import { useParams } from "react-router-dom";

import { FolderStructure } from "../Components/FolderStructure";
import { Terminal } from "../Components/Terminal";
import { EditorComponent } from "../Components/EditorComponent";
import { EditorTabs } from "../Components/EditorTabs";

import folderStructureStore from "../Store/folderStructureStore";
import activeTabStore from "../Store/activeTabStore";

export const Playground = () => {
  const { playgroundId } = useParams();

  const setFolderStructure = folderStructureStore(
    (state) => state.setFolderStructure
  );

  const setActiveTab = activeTabStore((state) => state.setActiveTab);

  setFolderStructure(playgroundId);

  const ws = new WebSocket("ws://localhost:3000/?playgroundId=" + playgroundId);

  ws.onopen = () => {
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "readFile") {
        const payload = data.payload.data;
        const path = data.payload.path;
        setActiveTab(path, "javascript", payload);
      }
    };
  };

  return (
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
        <FolderStructure ws={ws} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <EditorTabs />
        <EditorComponent />
        <Terminal />
      </div>
    </Row>
  );
};
