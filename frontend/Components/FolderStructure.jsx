import { useState } from "react";

import folderStructureStore from "../Store/folderStructureStore";
import websocketStore from "../Store/websocketStore";

import Collapse from "../assets/collapse.png";
import Expand from "../assets/expand.png";

const Tree = ({ data, ws }) => {
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
    ws.send(JSON.stringify(readFileRequest));
  };

  return (
    <div style={{ paddingLeft: "10px", color: "white" }}>
      {data.children ? (
        <button
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
        <p
          onDoubleClick={() => handleDoubleClick(data.path)}
          style={{
            fontSize: "15px",
            cursor: "pointer",
            marginLeft: "15px",
            paddingTop: "6px",
          }}
        >
          {data.name}
        </p>
      )}
      {visible[data.name] &&
        data.children &&
        data.children.map((child) => (
          <Tree key={child.name} data={child} ws={ws} />
        ))}
    </div>
  );
};

export const FolderStructure = () => {
  const folderStructure = folderStructureStore(
    (state) => state.folderStructure
  );
  const ws = websocketStore((state) => state.ws);

  return folderStructure && <Tree data={folderStructure} ws={ws} />;
};
