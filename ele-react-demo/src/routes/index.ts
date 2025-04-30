import App from '@src/app';
import AboutView from '@src/views/AboutView';
import IndexView from '@src/views/IndexView';
import { createBrowserRouter } from 'react-router';

// 项目路由
const router = createBrowserRouter([
  {
    path: '/',
    // 根路径，入口
    Component: App,
    children: [
      // 首页
      { index: true, Component: IndexView },
      // 关于页
      {
        path: 'about',
        Component: AboutView
      }
    ]
  }
]);

export default router;
