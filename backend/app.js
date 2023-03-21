const express = require("express");
const path = require("path");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { WebSocketServer } = require("ws");
const querystring = require("querystring");
const cors = require("cors");

const indexRouter = require("./routes/index");

const handleMonacoWebSocketEvents = require("./utils/handleMonacoWebSocketEvents");
const handleContainerCreate = require("./utils/handleContainerCreate");
const handleShellCreation = require("./utils/handleShellCreation");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

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
      handleMonacoWebSocketEvents(
        ws,
        finalMessage.type,
        finalMessage.payload.data,
        finalMessage.payload.path
      );
    });
  }
});

wsForShell.on("connection", (ws, req, container) => {
  handleShellCreation(container, ws);
});

server.on("upgrade", (req, socket, head) => {
  const isShell = req.url.includes("/shell");

  if (!isShell) {
    wsForMonaco.handleUpgrade(req, socket, head, (ws) => {
      wsForMonaco.emit("connection", ws, req);
    });
  } else {
    const { playgroundId } = querystring.parse(req.url.split("?")[1]);
    handleContainerCreate(playgroundId, wsForShell, req, socket, head);
  }
});
