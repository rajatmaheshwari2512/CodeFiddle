import { create } from "zustand";

const createFileOrFolderStore = create((set) => ({
  path: null,
  setPath: (path) => set({ path: path }),
}));

export default createFileOrFolderStore;
