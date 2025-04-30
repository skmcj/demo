import { contextBridge } from 'electron';
import { openImageDialog } from './utils/ipcRendererUtil';

contextBridge.exposeInMainWorld('elApi', {
  openImageDialog
});
