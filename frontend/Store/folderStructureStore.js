import { create } from "zustand";

const folderStructureStore = create((set) => ({
  folderStructure: null,
  setFolderStructure: async (playgroundId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tree/${playgroundId}`
    );
    set({ folderStructure: await response.json() });
  },
  updateFolderStructure: (newFolderStructure) =>
    set({ folderStructure: newFolderStructure }),
}));

export default folderStructureStore;
