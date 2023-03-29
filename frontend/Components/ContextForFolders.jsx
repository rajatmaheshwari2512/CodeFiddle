import createFileOrFolderStore from "../Store/createFileOrFolderStore";

export const ContextForFolders = ({ setOpen, x, y, path }) => {
  const setPath = createFileOrFolderStore((state) => state.setPath);

  const createDirectory = (e) => {
    console.log("here");
    setPath(path);
  };

  return (
    <div
      onMouseLeave={() => {
        setOpen(false);
      }}
      style={{
        width: "100px",
        position: "fixed",
        fontSize: "0px",
        left: x,
        top: y,
        border: "1px solid black",
      }}
    >
      <button
        onClick={createDirectory}
        style={{
          color: "white",
          backgroundColor: "#22212c",
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          cursor: "pointer",
        }}
      >
        Create Folder
      </button>
      <button
        style={{
          color: "white",
          backgroundColor: "#22212c",
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          cursor: "pointer",
        }}
      >
        Create File
      </button>
      <button
        style={{
          color: "white",
          backgroundColor: "#22212c",
          border: "none",
          outline: "none",
          width: "100%",
          height: "30px",
          cursor: "pointer",
        }}
      >
        Delete Folder
      </button>
    </div>
  );
};
