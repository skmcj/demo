interface ElApi {
  /**
   * 打开图片选择窗口
   * @param title
   * @param flag
   * @returns
   */
  openImageDialog: (title?: string, flag?: boolean) => Promise<string | undefined>;
}

interface Window {
  elApi: ElApi;
}
