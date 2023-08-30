import { Dispatch, ReactElement } from "react";

/**
 * Interfaces for the Zustand stores
 */

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

/**
 * Interfaces for Props
 */

export interface ContextForFilesProps {
  setOpen: (value: boolean) => void;
  x: number;
  y: number;
  path: string;
}

export interface ContextForFoldersProps {
  setOpen: (value: boolean) => void;
  x: number;
  y: number;
  path: string;
}

export interface EditorButtonComponentProps {
  path: string;
  isActive: boolean;
}

export interface TreeProps {
  data: FolderStructure;
  ws: WebSocket;
  addOrUpdateAvailableTabs: (path: string) => void;
  setX: Dispatch<number>;
  setY: Dispatch<number>;
  setContextForFileOpen: Dispatch<boolean>;
  setContextForFolderOpen: Dispatch<boolean>;
  setPath: Dispatch<string>;
}

export interface VisibleState {
  [key: string]: boolean;
}
