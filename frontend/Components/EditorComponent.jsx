import { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

import activeTabStore from "../Store/activeTabStore";

export const EditorComponent = () => {
  const activeTab = activeTabStore((state) => state.activeTab);

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetch("/Dracula.json")
      .then((data) => data.json())
      .then((data) => setTheme(data));
  }, []);

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
        onMount={(editor, monaco) => {
          monaco.editor.defineTheme("dracula", theme);
          monaco.editor.setTheme("dracula");
        }}
      />
    )
  );
};
