// This should ideally be a HOC but I'm too lazy to do it.

import { useState } from "react";

import { Input, Modal } from "antd";

import websocketStore from "../Store/websocketStore";
import createFileOrFolderStore from "../Store/createFileOrFolderStore";

export const FileModal = () => {
  const [name, setName] = useState("");

  const ws = websocketStore((state) => state.ws);
  const path = createFileOrFolderStore((state) => state.path);
  const isFile = createFileOrFolderStore((state) => state.isFile);

  const setPath = createFileOrFolderStore((state) => state.setPath);
  const setIsFile = createFileOrFolderStore((state) => state.setIsFile);

  const createFolder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    ws?.send(
      JSON.stringify({
        type: "createFile",
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
      title="Create a File"
      open={Boolean(path && isFile === 1)}
      onOk={createFolder}
      onCancel={() => {
        setName("");
        setPath(null);
        setIsFile(-1);
      }}
    >
      <Input
        placeholder="File Name"
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};
