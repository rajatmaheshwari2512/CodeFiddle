import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

import shellSocketStore from "../Store/shellSocketStore";

export const ShellComponent = () => {
  const setWs = shellSocketStore((state) => state.setWs);

  const terminal = useRef(null);

  const { playgroundId } = useParams();

  const ws = new WebSocket(
    "ws://localhost:3000/shell/?playgroundId=" + playgroundId
  );

  useEffect(() => {
    const term = new Terminal({
      cursorBlink: true,
      convertEol: true,
      theme: {
        background: "#282a36",
        foreground: "#f8f8f2",
        cyan: "#8be9fd",
        green: "#50fa7b",
        yellow: "#f1fa8c",
        red: "#ff5555",
        cursor: "#f8f8f2",
        cursorAccent: "#282a36",
      },
      fontSize: 16,
      fontFamily: "Ubuntu Mono, monospace",
    });
    term.open(terminal.current!);
    let fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();
    ws.onopen = () => {
      const attachAddon = new AttachAddon(ws);
      term.loadAddon(attachAddon);
      setWs(ws);
    };
    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div
      style={{
        height: "23vh",
        overflow: "auto",
      }}
      ref={terminal}
      className="terminal"
      id="terminal-container"
    />
  );
};
