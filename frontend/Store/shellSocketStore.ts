import { create } from "zustand";

import { ShellSocketStoreState } from "../Types/types";

const shellSocketStore = create<ShellSocketStoreState>()((set) => ({
  wsForShell: null,
  setWs: (ws) => set({ wsForShell: ws }),
}));

export default shellSocketStore;
