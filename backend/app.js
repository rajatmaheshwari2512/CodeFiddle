const express = require("express");

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const WebSocketServer = require("websocket").server;
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

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const ws = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

ws.on("request", (request) => {
  const params = querystring.parse(request.httpRequest.url.split("?")[1]);
  const playgroundId = params.playgroundId;
  const ws = request.accept(null, request.origin);
  docker.createContainer(
    {
      Image: "ubuntu-user",
      name: playgroundId,
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
            __dirname + "/playgrounds/" + playgroundId
          )}:/home/rajat/code`,
        ],
      },
    },
    (err, container) => {
      if (err) {
        console.log(err);
        ws.send(err);
      } else {
        container.start();
        ws.on("message", (message) => {
          const messageData = JSON.parse(message.utf8Data);
          handleWebSocketEvents(
            ws,
            playgroundId,
            messageData.type,
            messageData.payload.data,
            messageData.payload.path
          );
        });
      }
    }
  );
});
