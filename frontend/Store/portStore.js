import { create } from "zustand";

const portStore = create((set) => ({
  port: null,
  setPort: (port, ws, ack) => set({ port: port }),
}));

export default portStore;
