import { useState } from "react";

import { Input, Modal } from "antd";

import websocketStore from "../Store/websocketStore";
import createFileOrFolderStore from "../Store/createFileOrFolderStore";

export const FolderModal = () => {
  const [name, setName] = useState("");

  const ws = websocketStore((state) => state.ws);
  const path = createFileOrFolderStore((state) => state.path);
  const isFile = createFileOrFolderStore((state) => state.isFile);

  const setPath = createFileOrFolderStore((state) => state.setPath);
  const setIsFile = createFileOrFolderStore((state) => state.setIsFile);

  const createFolder = (e) => {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: "createFolder",
        payload: {
          path: path + "/" + name,
          data: null,
        },
      })
    );
    setName("");
  };

  return (
    <Modal
      title="Create a Folder"
      open={path && isFile === 0}
      onOk={createFolder}
      onCancel={() => {
        setName("");
        setPath(null);
        setIsFile(-1);
      }}
    >
      <Input
        placeholder="Folder Name"
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};
