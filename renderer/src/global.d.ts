export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      openFile: (filePath: string) => Promise<void>;
    };
  }
  interface File {
    path?: string;
  }
}
