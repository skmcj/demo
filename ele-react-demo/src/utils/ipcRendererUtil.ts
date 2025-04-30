import { ipcRenderer } from 'electron';

/**
 * 打开本地弹窗 - 选择单一图片
 * @returns
 */
export const openImageDialog = (title?: string, flag: boolean = true) => {
  return ipcRenderer.invoke('open-image-dialog', title, flag);
};
