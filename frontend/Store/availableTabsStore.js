import { create } from "zustand";

const availableTabsStore = create((set, get) => ({
  availableTabs: {},
  addOrUpdateAvailableTabs: (path) => {
    // console.log("HEREEBRIERE", get().availableTabs);
    const availableTabs = get().availableTabs;
    Object.keys(availableTabs).forEach((key) => {
      availableTabs[key] = false;
    });
    // console.log("HEREEBRIERE", availableTabs);
    const newState = { ...availableTabs, [path]: true };
    set({ availableTabs: newState });
  },
}));

export default availableTabsStore;
