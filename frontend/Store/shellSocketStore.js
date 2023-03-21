import { create } from "zustand";

const shellSocketStore = create((set) => ({
  wsForShell: null,
  setWs: (ws) => set({ wsForShell: ws }),
}));

export default shellSocketStore;
