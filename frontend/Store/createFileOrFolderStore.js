import { create } from "zustand";

const createFileOrFolderStore = create((set) => ({
  path: null,
  setPath: (path) => set({ path: path }),
  isFile: -1,
  setIsFile: (isFile) => set({ isFile: isFile }),
}));

export default createFileOrFolderStore;
