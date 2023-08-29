import { create } from "zustand";

import { ActiveTabStoreState } from "../Types/types";

const activeTabStore = create<ActiveTabStoreState>()((set) => ({
  activeTab: null,
  setActiveTab: (path, extension, value) =>
    set({ activeTab: { path: path, extension: extension, value: value } }),
}));

export default activeTabStore;
