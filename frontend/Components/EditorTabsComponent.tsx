import { EditorButtonComponent } from "./EditorButtonComponent";

import availableTabsStore from "../Store/availableTabsStore";

export const EditorTabsComponent = () => {
  const availableTabs = availableTabsStore((state) => state.availableTabs);

  return (
    <div
      style={{
        display: "flex",
        paddingTop: "5px",
        paddingBottom: "5px",
        height: "2vh",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      {Object.keys(availableTabs).length > 0 &&
        Object.entries(availableTabs).map((entries) => {
          return (
            <EditorButtonComponent
              path={entries[0]}
              isActive={entries[1]}
              key={entries[0]}
            />
          );
        })}
    </div>
  );
};
