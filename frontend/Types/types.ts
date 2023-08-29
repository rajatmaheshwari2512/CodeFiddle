/**
 * Interfaces for the Zustand stores
 */

import { ReactElement } from "react";

export interface CreateFileOrFolderStoreState {
  path: string | null;
  setPath: (path: string | null) => void;
  isFile: number;
  setIsFile: (isFile: number) => void;
}

export interface ActiveTabStoreState {
  activeTab: {
    path: string | undefined;
    extension: string | undefined;
    value: string;
  } | null;
  setActiveTab: (
    path: string,
    extension: string | undefined,
    value: string
  ) => void;
}

interface AvailableTabs {
  [key: string]: boolean;
}

export interface AvailableTabsStoreState {
  availableTabs: AvailableTabs;
  addOrUpdateAvailableTabs: (path: string) => void;
}

export interface FolderStructure {
  path: string;
  name: string;
  children: FolderStructure[];
}

export interface FolderStructureStoreState {
  folderStructure: FolderStructure | null;
  setFolderStructure: (playgroundId: string) => void;
}

export interface PortStoreState {
  port: number | null;
  setPort: (port: number) => void;
}

export interface ShellSocketStoreState {
  wsForShell: WebSocket | null;
  setWs: (ws: WebSocket) => void;
}

export interface WebsocketStoreState {
  ws: WebSocket | null;
  setWs: (ws: WebSocket) => void;
}

/******************************************/

export interface IconPackInterface {
  [key: string]: ReactElement;
}
