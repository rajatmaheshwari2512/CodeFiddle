interface ContextForFilesProps {
  setOpen: (value: boolean) => void;
  x: number;
  y: number;
  path: string;
}

export const ContextForFiles = ({
  setOpen,
  x,
  y,
  path,
}: ContextForFilesProps) => {
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
        // onClick={deleteFile}
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
        Delete File
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
        Rename File
      </button>
    </div>
  );
};
