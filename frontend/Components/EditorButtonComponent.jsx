export const EditorButtonComponent = ({ path, isActive }) => {
  return (
    <button
      style={{
        outline: "none",
        minWidth: "100px",
        height: "25px",
        backgroundColor: isActive ? "#282a36" : "#22212c",
        fontSize: "14px",
        borderLeft: "none",
        borderBottom: "none",
        borderRight: "2px solid #191921",
        fontFamily: "Droid Sans Mono, monospace",
        borderTop: isActive ? "1px solid #ff79c6" : "none",
        color: isActive ? "white" : "#6272a4",
        paddingLeft: "5px",
        paddingRight: "5px",
        // marginRight: "5px",
      }}
      disabled={isActive}
    >
      {path.split("/").pop()}
    </button>
  );
};
