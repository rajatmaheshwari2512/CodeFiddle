import { create } from "zustand";

import { PortStoreState } from "../Types/types";

const portStore = create<PortStoreState>()((set) => ({
  port: null,
  setPort: (port) => set({ port: port }),
}));

export default portStore;
