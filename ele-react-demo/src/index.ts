import { app, BrowserWindow, net, protocol } from 'electron';
import { existsSync } from 'fs';
import path from 'path';
import url from 'url';
import { bindIpcMainHandler } from './utils/ipcMainUtil';

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
  // mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (process.env.ENV === 'development') mainWindow.loadURL('http://localhost:3000/');
  else mainWindow.loadURL('app://renderer/');

  // 打开开发者工具
  // mainWindow.webContents.openDevTools();
};

// 注册自定义协议
if (process.env.ENV !== 'development')
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        secure: true,
        standard: true,
        supportFetchAPI: true,
        corsEnabled: true,
        bypassCSP: true
      }
    },
    {
      scheme: 'local',
      privileges: {
        secure: true,
        standard: true,
        supportFetchAPI: true,
        bypassCSP: true
      }
    }
  ]);
// 注册用于打开本地文件的协议
else
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'local',
      privileges: {
        secure: true,
        standard: true,
        supportFetchAPI: true,
        bypassCSP: true
      }
    }
  ]);

// 当 Electron 初始化完成并准备创建渲染窗口(mainWindow)时调用
// 某些 API 只能在此事件发生后使用
// app.on('ready', createWindow);
app.on('ready', async () => {
  bindIpcMainHandler();
  /**
   * 自定义协议：app
   */
  if (process.env.ENV !== 'development')
    protocol.handle('app', request => {
      // const { host, pathname } = new URL(request.url);
      // console.log('app:// =>', host, pathname);
      // 自定义协议
      // 首个 / 分割符前的字符串相当于域名，即跟路径
      // 后续文件中类似 /
      let fileUri = request.url.slice('app://'.length);
      let filePath;
      if (/\.[0-9a-zA-Z]{1,}$/.test(fileUri)) {
        // 为文件路径
        filePath = path.join(__dirname, '..', fileUri);
        if (!existsSync(filePath)) {
          // 文件不存在
          fileUri = 'renderer/main_window/index.html';
          filePath = path.join(__dirname, '..', fileUri);
        }
      } else {
        // 非文件路径，可能为文件夹
        fileUri = 'renderer/main_window/index.html';
        filePath = path.join(__dirname, '..', fileUri);
      }
      return net.fetch(url.pathToFileURL(filePath).toString());
    });
  /** 自定义协议：local */
  protocol.handle('local', request => {
    // 自定义协议
    // 首个 / 分割符前的字符串相当于域名，即跟路径
    // 后续文件中类似 /
    try {
      // 例如 request.url => local://C&/images/bg.jpg
      // fileUrl => C&/images/bg.jpg
      const fileUrl = decodeURIComponent(request.url.replace('local://', ''));
      // fixedPath => C:/images/bg.jpg
      const fixedPath = fileUrl.replace(/^([A-Za-z])\&/, '$1:'); // C& → C:

      // 可以加入更多的验证步骤，确保路径是合法的
      // 甚至可以令协议支持相对路径
      // ··· ···

      return net.fetch(url.pathToFileURL(fixedPath).toString());
    } catch (err) {
      return new Response('Not Found', { status: 404 });
    }
  });

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
