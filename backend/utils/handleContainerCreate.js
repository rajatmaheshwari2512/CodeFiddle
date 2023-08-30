const path = require("path");
const Docker = require("dockerode");

const docker = new Docker();

const handleContainerCreate = (playgroundId, wsForShell, req, socket, head) => {
  docker.createContainer(
    {
      Image: "codefiddle",
      // name: playgroundId,
      AttachStderr: true,
      AttachStdin: true,
      AttachStdout: true,
      Cmd: "/bin/bash".split(" "),
      Tty: true,
      Volumes: {
        "/home/rajat/code": {},
      },
      HostConfig: {
        Binds: [
          `${path.resolve(
            __dirname + "/../playgrounds/" + playgroundId + "/code"
          )}:/home/rajat/code`,
        ],
        PortBindings: {
          "5173/tcp": [{ HostPort: "0" }],
        },
      },
      ExposedPorts: {
        "5173/tcp": {},
      },
    },
    (err, container) => {
      if (err) {
        console.log(err);
        // ws.send(err);
      } else {
        container.start().then(() => {
          wsForShell.handleUpgrade(req, socket, head, (ws) => {
            wsForShell.emit("connection", ws, req, container);
          });
        });
      }
    }
  );
};

module.exports = handleContainerCreate;
