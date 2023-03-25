import { useState } from "react";

import { ContextForFiles } from "./ContextForFiles";
import { ContextForFolders } from "./ContextForFolders";

import folderStructureStore from "../Store/folderStructureStore";
import websocketStore from "../Store/websocketStore";
import availableTabsStore from "../Store/availableTabsStore";

import Collapse from "../assets/collapse.png";
import Expand from "../assets/expand.png";

import { AiFillFile } from "react-icons/ai";
import { IconPack } from "../assets/IconPack";

const Tree = ({ data, ws, addOrUpdateAvailableTabs }) => {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = (name) => {
    setVisible({ ...visible, [name]: !visible[name] });
  };

  const handleDoubleClick = (path) => {
    const readFileRequest = {
      type: "readFile",
      payload: {
        path: path,
        data: null,
      },
    };
    addOrUpdateAvailableTabs(path);
    ws.send(JSON.stringify(readFileRequest));
  };

  return (
    <div style={{ paddingLeft: "10px", color: "white" }}>
      {data.children ? (
        <button
          // onContextMenu={handleContextForFolders}
          onClick={() => toggleVisibility(data.name)}
          style={{
            paddingTop: "6px",
            fontSize: "15px",
            backgroundColor: "transparent",
            color: "white",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={visible[data.name] ? Collapse : Expand}
            height="10px"
            width="10px"
          />
          &nbsp;
          {data.name}
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          {IconPack.hasOwnProperty(data.name.split(".").pop()) ? (
            IconPack[data.name.split(".").pop()]
          ) : (
            <AiFillFile
              color="gray"
              display="block"
              style={{ marginTop: "7px" }}
            />
          )}
          <p
            // onContextMenu={handleContextForFiles}
            onDoubleClick={() => handleDoubleClick(data.path)}
            style={{
              fontSize: "15px",
              cursor: "pointer",
              marginLeft: "5px",
              paddingTop: "6px",
            }}
          >
            {data.name}
          </p>
        </div>
      )}
      {visible[data.name] &&
        data.children &&
        data.children.map((child) => (
          <Tree
            key={child.name}
            data={child}
            ws={ws}
            addOrUpdateAvailableTabs={addOrUpdateAvailableTabs}
          />
        ))}
    </div>
  );
};

export const FolderStructureComponent = () => {
  const folderStructure = folderStructureStore(
    (state) => state.folderStructure
  );
  const addOrUpdateAvailableTabs = availableTabsStore(
    (state) => state.addOrUpdateAvailableTabs
  );

  const ws = websocketStore((state) => state.ws);

  return (
    folderStructure && (
      <Tree
        data={folderStructure}
        ws={ws}
        addOrUpdateAvailableTabs={addOrUpdateAvailableTabs}
      />
    )
  );
};
