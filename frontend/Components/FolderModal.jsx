import { useState } from "react";

import { Input, Modal } from "antd";

import websocketStore from "../Store/websocketStore";
import createFileOrFolderStore from "../Store/createFileOrFolderStore";

export const FolderModal = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);

  const ws = websocketStore((state) => state.ws);
  const path = createFileOrFolderStore((state) => state.path);

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
    setOpen(false);
  };

  return (
    path && (
      <Modal title="Create a Folder" open={open} onOk={createFolder}>
        <Input
          placeholder="Folder Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    )
  );
};
