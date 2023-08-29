import { create } from "zustand";

import { WebsocketStoreState } from "../Types/types";

const websocketStore = create<WebsocketStoreState>()((set) => ({
  ws: null,
  setWs: (ws) => set({ ws: ws }),
}));

export default websocketStore;
