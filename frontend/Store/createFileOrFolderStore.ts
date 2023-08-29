import { create } from "zustand";

import { CreateFileOrFolderStoreState } from "../Types/types";

const createFileOrFolderStore = create<CreateFileOrFolderStoreState>()(
  (set) => ({
    path: null,
    setPath: (path) => set({ path: path }),
    isFile: -1,
    setIsFile: (isFile) => set({ isFile: isFile }),
  })
);

export default createFileOrFolderStore;
