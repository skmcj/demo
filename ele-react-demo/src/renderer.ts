/**
 * 此文件将由 webpack 中自动加载并在 renderer 上下文中运行
 * 要了解有关 Electron 中 main 和 renderer 上下文之间差异的更多信息
 * 请访问：
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * 默认情况下，此文件中的 Node.js 集成被禁用
 * 在渲染器进程中启用 Node.js 集成时，请注意潜在的安全隐患
 * 您可以在此处阅读更多关于安全风险的信息：
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * 要在此文件中启用 Node.js 集成
 * 请打开 index.js 并启用 nodeIntegration 标志：
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.scss';
import './app';

(function () {
  const info = `
 ________  ___  __    _____ ______   ________        ___     
|\\   ____\\|\\  \\|\\  \\ |\\   _ \\  _   \\|\\   ____\\      |\\  \\    
\\ \\  \\___|\\ \\  \\/  /|\\ \\  \\\\\\__\\ \\  \\ \\  \\___|      \\ \\  \\   
 \\ \\_____  \\ \\   ___  \\ \\  \\\\|__| \\  \\ \\  \\       __ \\ \\  \\  
  \\|____|\\  \\ \\  \\\\ \\  \\ \\  \\    \\ \\  \\ \\  \\____ |\\  \\\\_\\  \\ 
    ____\\_\\  \\ \\__\\\\ \\__\\ \\__\\    \\ \\__\\ \\_______\\ \\________\\
   |\\_________\\|__| \\|__|\\|__|     \\|__|\\|_______|\\|________|
   \\|_________|
  `;
  console.log(`%c${info}`, `color: #32788a`);
})();
