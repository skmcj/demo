import { BrowserWindow, dialog, ipcMain } from 'electron';

export const bindIpcMainHandler = function () {
  // 打开图片选择窗口
  ipcMain.handle('open-image-dialog', async (event, title: string = '选择图片', flag: boolean = true) => {
    try {
      const options: Electron.OpenDialogOptions = {
        title,
        buttonLabel: '选择',
        properties: ['openFile'],
        filters: [
          {
            name: 'image',
            extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif']
          }
        ]
      };
      let res: Electron.OpenDialogReturnValue;
      if (flag) {
        const win = BrowserWindow.fromWebContents(event.sender);
        res = await dialog.showOpenDialog(win, options);
      } else {
        res = await dialog.showOpenDialog(options);
      }
      const file = !!res.filePaths.length ? res.filePaths[0] : void 0;
      return file;
    } catch (err) {
      return Promise.reject(err);
    }
  });
};
