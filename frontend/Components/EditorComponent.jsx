import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

import activeTabStore from "../Store/activeTabStore";
import websocketStore from "../Store/websocketStore";

export const EditorComponent = () => {
  const activeTab = activeTabStore((state) => state.activeTab);
  const ws = websocketStore((state) => state.ws);

  const [theme, setTheme] = useState(null);

  let eventToEmit = null;

  useEffect(() => {
    fetch("/Dracula.json")
      .then((data) => data.json())
      .then((data) => setTheme(data));
  }, []);

  const handleChange = (value, e) => {
    clearTimeout(eventToEmit);
    eventToEmit = setTimeout(() => {
      const writeFile = {
        type: "writeFile",
        payload: {
          data: value,
          path: activeTab.path,
        },
      };
      ws.send(JSON.stringify(writeFile));
    }, 2000);
  };

  return (
    theme && (
      <Editor
        saveViewState={true}
        height="74vh"
        width="100%"
        path={activeTab ? activeTab.path : ""}
        defaultLanguage={undefined}
        defaultValue={
          activeTab ? activeTab.value : "Click on a file and start editing"
        }
        onChange={handleChange}
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("dracula", theme);
          monaco.editor.setTheme("dracula");
        }}
        options={{
          readOnly: activeTab ? false : true,
          fontSize: "14px",
          fontFamily: "Droid Sans Mono",
        }}
      />
    )
  );
};
