import { useParams } from "react-router-dom";

import { Allotment } from "allotment";

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
          setActiveTab(path, undefined, payload);
          break;
        case "registerPort":
          const port = data.payload.port;
          setPort(port);
        case "createFile":
        case "createFolder":
        case "deleteFile":
        case "deleteFolder":
          setFolderStructure(playgroundId);
          break;
      }
    };
  };

  return (
    ws && (
      <div style={{ display: "flex" }}>
        <div
          style={{
            paddingRight: "10px",
            paddingTop: "0.2vh",
            minWidth: "250px",
            maxWidth: "25%",
            height: "99.8vh",
            backgroundColor: "#22212c",
            fontFamily: "Roboto, sans-serif",
            overflow: "auto",
          }}
        >
          <FolderStructureComponent />
        </div>
        <div style={{ height: "100vh", width: "100vw" }}>
          <Allotment>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#282a36",
                width: "100%",
              }}
            >
              <div style={{ borderBottom: "1px solid #bd93f9" }}>
                <EditorTabsComponent />
                <EditorComponent />
              </div>
              <ShellComponent />
            </div>
            <BrowserComponent />
          </Allotment>
        </div>
      </div>
    )
  );
};
