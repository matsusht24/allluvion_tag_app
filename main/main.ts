import { app, BrowserWindow, ipcMain } from "electron";

import path from "path";
import { fileURLToPath }  from "url";

let mainWindow: BrowserWindow | null = null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (process.env.ELECTRON_DEV) {
    mainWindow.loadURL("http://localhost:5173"); //Vite dev server URL
    mainWindow.webContents.openDevTools();
    console.log("Running in development mode, loading from Vite dev server.");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/dist/index.html")); //loads the built React app
    console.log("Running in production mode, loading from built files.");
  }
};

app.whenReady()
.then(() => {
  ipcMain.handle("ping", () => {
    return "pong from main process";
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
})
.catch((error) => {
  console.error("Error during app initialization:", error);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin"){
    app.quit();
    process.exit(0); // Ensure the app exits completely on non-macOS platforms
  };
});


