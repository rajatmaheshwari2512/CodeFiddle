const path = require("path");

const Docker = require("dockerode");

const processOutput = require("./processOutput");

const docker = new Docker();

const handleShellWebSocketEvents = (ws, playgroundId) => {
  docker.createContainer(
    {
      Image: "ubuntu-user",
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
        ws.send(err);
      } else {
        container.start().then(() => {
          container.exec(
            {
              Cmd: ["/bin/bash"],
              AttachStdin: true,
              AttachStdout: true,
              AttachStderr: true,
              Tty: true,
              User: "rajat",
            },
            (err, exec) => {
              exec.start(
                {
                  stdin: false,
                  hijack: true,
                },
                (err, stream) => {
                  processOutput(stream, ws);
                  ws.on("message", (message) => {
                    stream.write(message);
                  });
                }
              );
            }
          );
        });
      }
    }
  );
};

module.exports = handleShellWebSocketEvents;
