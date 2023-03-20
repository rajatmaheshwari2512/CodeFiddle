const express = require("express");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { WebSocketServer } = require("ws");
const Docker = require("dockerode");
const querystring = require("querystring");
const cors = require("cors");

const indexRouter = require("./routes/index");
const handleWebSocketEvents = require("./utils/handleWebSocketEvents");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

const docker = new Docker();

function processOutput(stream, ws) {
  let nextDataType = null;
  let nextDataLength = null;
  let buffer = Buffer.from("");

  function processData(data) {
    if (data) {
      buffer = Buffer.concat([buffer, data]);
    }
    if (!nextDataType) {
      if (buffer.length >= 8) {
        const header = bufferSlice(8);
        nextDataType = header.readUInt8(0);
        nextDataLength = header.readUInt32BE(4);
        // It's possible we got a "data" that contains multiple messages
        // Process the next one
        processData();
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlice(nextDataLength);
        ws.send(content);
        nextDataType = null;
        // It's possible we got a "data" that contains multiple messages
        // Process the next one
        processData();
      }
    }
  }

  function bufferSlice(end) {
    const out = buffer.slice(0, end);
    buffer = Buffer.from(buffer.slice(end, buffer.length));
    return out;
  }

  stream.on("data", processData);
}

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const wsForMonaco = new WebSocketServer({
  noServer: true,
});

const wsForShell = new WebSocketServer({
  noServer: true,
});

wsForMonaco.on("connection", (ws, req) => {
  const params = querystring.parse(req.url.split("?")[1]);
  const playgroundId = params.playgroundId;
  if (playgroundId) {
    ws.on("message", (message) => {
      const finalMessage = JSON.parse(message.toString());
      handleWebSocketEvents(
        ws,
        finalMessage.type,
        finalMessage.payload.data,
        finalMessage.payload.path
      );
    });
  }
});

wsForShell.on("connection", (ws, req) => {
  const params = querystring.parse(req.url.split("?")[1]);
  const playgroundId = params.playgroundId;
  if (playgroundId) {
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
              __dirname + "/playgrounds/" + playgroundId + "/code"
            )}:/home/rajat/code`,
          ],
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
  }
});

server.on("upgrade", (req, socket, head) => {
  const isShell = req.url.includes("/shell");

  if (!isShell) {
    wsForMonaco.handleUpgrade(req, socket, head, (ws) => {
      wsForMonaco.emit("connection", ws, req);
    });
  } else {
    wsForShell.handleUpgrade(req, socket, head, (ws) => {
      wsForShell.emit("connection", ws, req);
    });
  }
});
