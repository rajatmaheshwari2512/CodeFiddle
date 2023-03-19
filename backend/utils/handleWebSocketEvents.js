const fs = require("fs");

const handleWebSocketEvents = (ws, type, data, pathToFileOrFolder) => {
  switch (type) {
    case "writeFile":
      fs.writeFile(pathToFileOrFolder, data, (err) => {
        if (err) {
          console.log(err);
          const errMessage = {
            type: "error",
            payload: {
              data: "Could not write to file",
            },
          };
          ws.send(JSON.stringify(errMessage));
        } else {
          const successMessage = {
            type: "writeFile",
            payload: {
              data: "File written successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "readFile":
      fs.readFile(pathToFileOrFolder, (err, data) => {
        if (err) {
          console.log(err);
          const errMessage = {
            type: "error",
            payload: {
              data: "Could not read file",
            },
          };
          ws.send(JSON.stringify(errMessage));
        } else {
          const successMessage = {
            type: "readFile",
            payload: {
              data: data.toString(),
              path: pathToFileOrFolder,
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "deleteFile":
      fs.unlink(pathToFileOrFolder, (err) => {
        if (err) {
          console.log(err);
          const errMessage = {
            type: "error",
            payload: {
              data: "Could not delete file",
            },
          };
          ws.send(JSON.stringify(errMessage));
        } else {
          const successMessage = {
            type: "deleteFile",
            payload: {
              data: "File deleted successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "createFolder":
      fs.mkdir(pathToFileOrFolder, (err) => {
        if (err) {
          console.log(err);
          const errMessage = {
            type: "error",
            payload: {
              data: "Could not create folder",
            },
          };
          ws.send(JSON.stringify(errMessage));
        } else {
          const successMessage = {
            type: "createFolder",
            payload: {
              data: "Folder created successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "deleteFolder":
      fs.rmdir(pathToFileOrFolder, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
          const errMessage = {
            type: "error",
            payload: {
              data: "Could not delete folder",
            },
          };
          ws.send(JSON.stringify(errMessage));
        } else {
          const successMessage = {
            type: "deleteFolder",
            payload: {
              data: "Folder deleted successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    default:
      console.log("Invalid type");
      const errMessage = {
        type: "error",
        payload: {
          data: "Invalid type",
        },
      };
      ws.send(JSON.stringify(errMessage));
      break;
  }
};

module.exports = handleWebSocketEvents;
