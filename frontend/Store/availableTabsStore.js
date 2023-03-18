import { create } from "zustand";

const availableTabsStore = create((set) => ({
  availableTabs: [],
  addToAvailableTabs: (path, extension, value) =>
    set((state) => ({
      availableTabs: [
        ...state.availableTabs,
        { path: path, extension: extension, value: value },
      ],
    })),
}));

export default availableTabsStore;
