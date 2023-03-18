import { create } from "zustand";

const activeTabStore = create((set) => ({
  activeTab: null,
  setActiveTab: (path, extension, value) =>
    set({ activeTab: { path: path, extension: extension, value: value } }),
}));

export default activeTabStore;
