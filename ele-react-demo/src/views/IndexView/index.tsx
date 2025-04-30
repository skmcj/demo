import { useState } from 'react';
import './style.scss';

/**
 * 主界面
 */
export default function IndexView() {
  const [cover, setCover] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  // 从本地选择图片
  function chooseImage() {
    window.elApi
      .openImageDialog('选择背景图')
      .then(res => {
        setCover(`local://${res.replace(':', '&')}`);
      })
      .catch(err => {
        console.log('error =>', err);
      });
  }

  // 处理图片加载完成
  function handleImageLoad() {
    setIsLoad(true);
  }

  // 处理图片加载失败
  function handleImageError() {
    setIsLoad(false);
  }

  // 新建一个窗口
  function createWindow() {
    window.open('/about', '_blank');
    // 也可以通过进程通信
    // 通知主进程通过 new BrowserWindow 创建
  }

  return (
    <div className="index-view">
      <h2>主视图</h2>
      <button onClick={createWindow}>新建窗口</button>
      <button onClick={chooseImage}>选择图片</button>
      <div className="cover">
        <img
          className={`cover${isLoad ? '' : ' unload'}`}
          src={cover}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {!isLoad ? <span className="tip">未选择图片</span> : null}
      </div>
    </div>
  );
}
