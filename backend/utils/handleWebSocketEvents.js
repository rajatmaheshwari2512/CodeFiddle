const fs = require("fs");
const path = require("path");

const handleWebSocketEvents = (ws, id, type, data, pathToFileOrFolder) => {
  const completePathToFileOrFolder = path.resolve(
    `${__dirname}/playgrounds/${id}/${pathToFileOrFolder}`
  );
  switch (type) {
    case "writeFile":
      fs.writeFile(completePathToFileOrFolder, data, (err) => {
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
            type: "success",
            payload: {
              data: "File written successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "readFile":
      fs.readFile(completePathToFileOrFolder, (err, data) => {
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
            type: "success",
            payload: {
              data: data.toString(),
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "deleteFile":
      fs.unlink(completePathToFileOrFolder, (err) => {
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
            type: "success",
            payload: {
              data: "File deleted successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "createFolder":
      fs.mkdir(completePathToFileOrFolder, (err) => {
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
            type: "success",
            payload: {
              data: "Folder created successfully",
            },
          };
          ws.send(JSON.stringify(successMessage));
        }
      });
      break;
    case "deleteFolder":
      fs.rmdir(completePathToFileOrFolder, { recursive: true }, (err) => {
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
            type: "success",
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
