import { app, BrowserWindow } from 'electron';
const path = require('path');

// 插件自动生成的常量
// 渲染器的入口点
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// 渲染器的预加载脚本
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// 处理当在 Windows 上安装(卸载)时创建(删除)快捷方式
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Loading 窗口
let loadingWin: BrowserWindow;
// Loading 窗口的渲染文档，即上侧的 loading 效果
const loadingUrl = path.join(__dirname, '../renderer/static/loading.html');

const createLoading = () => {
  return new Promise((resolve, reject) => {
    loadingWin = new BrowserWindow({
      // 一开始是否显示
      show: false,
      width: 512,
      height: 512,
      frame: false, // 无边框(窗口、工具栏等)，只包含网页内容
      transparent: true // 窗口是否支持透明，如果想做高级效果最好为 true
    });
    // 当窗口显示后，resolve Promise
    loadingWin.once('show', () => {
      resolve(true);
    });
    // Loading 窗口渲染文档
    loadingWin.loadFile(loadingUrl);
    // 显示 Loading 窗口
    loadingWin.show();
  });
};

const createWindow = () => {
  // 创建渲染窗口
  const mainWindow = new BrowserWindow({
    // icon: './assets/logo/logo.ico',
    height: 600,
    width: 800,
    show: false,
    webPreferences: {
      // 预加载脚本
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });
  // 主窗口准备好显示时
  mainWindow.once('ready-to-show', () => {
    // 隐藏 Loading 窗口
    loadingWin.hide();
    // 关闭 Loading 窗口
    loadingWin.close();
    // 显示 主窗口
    mainWindow.show();
  });

  // 为窗口加载 index.html
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // 打开开发者工具
  // mainWindow.webContents.openDevTools();
};

// 当 Electron 初始化完成并准备创建渲染窗口(mainWindow)时调用
// 某些 API 只能在此事件发生后使用
// app.on('ready', createWindow);
app.on('ready', async () => {
  // 先创建 Loading 窗口
  await createLoading();
  // 再创建 主窗口
  createWindow();
});

// 当所有窗口关闭时退出(MacOS除外，由于此时其应用程序及菜单栏通常会保持活动，直到用户明确按 Cmd + Q 才退出)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 OS X 上，当单击 ck 图标并且没有其他打开的窗口时，通常会在应用程序中重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 在此文件中，可以包含应用程序的其他特定主进程代码
// 还可以将它们放在单独的文件中，并在此处导入
