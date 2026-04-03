const { app, BrowserWindow } = require('electron');

// Keep a reference to the window object to prevent it from being garbage-collected
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Security best practice
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    // Load your Notebook LM website
    mainWindow.loadURL('https://notebooklm.google.com');

    // Optional: Open DevTools for debugging
    // mainWindow.webContents.openDevTools();

    // Event handler when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Event listener for when Electron is ready
app.on('ready', createWindow);

// Event listener for when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Event listener for when the app is activated (e.g., clicked on dock/icon)
app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});