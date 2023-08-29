import { create } from "zustand";

import { AvailableTabsStoreState } from "../Types/types";

const availableTabsStore = create<AvailableTabsStoreState>()((set, get) => ({
  availableTabs: {},
  addOrUpdateAvailableTabs: (path) => {
    const availableTabs = get().availableTabs;
    Object.keys(availableTabs).forEach((key) => {
      availableTabs[key] = false;
    });
    const newState = { ...availableTabs, [path]: true };
    set({ availableTabs: newState });
  },
}));

export default availableTabsStore;
