import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

import activeTabStore from "../Store/activeTabStore";
import websocketStore from "../Store/websocketStore";

export const EditorComponent = () => {
  const activeTab = activeTabStore((state) => state.activeTab);
  const ws = websocketStore((state) => state.ws);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetch("/Dracula.json")
      .then((data) => data.json())
      .then((data) => setTheme(data));
  }, []);

  const handleChange = (value, e) => {
    const writeFile = {
      type: "writeFile",
      payload: {
        data: value,
        path: activeTab.path,
      },
    };

    ws.send(JSON.stringify(writeFile));
  };

  return (
    activeTab &&
    theme && (
      <Editor
        saveViewState={true}
        height="90vh"
        width="85vw"
        path={activeTab.path}
        defaultLanguage={activeTab.extension}
        defaultValue={activeTab.value}
        onChange={handleChange}
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("dracula", theme);
          monaco.editor.setTheme("dracula");
        }}
      />
    )
  );
};
