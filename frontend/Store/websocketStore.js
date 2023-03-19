import { create } from "zustand";

const websocketStore = create((set) => ({
  ws: null,
  setWs: (ws) => set({ ws: ws }),
}));

export default websocketStore;
