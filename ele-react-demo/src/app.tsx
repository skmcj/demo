import { createRoot } from 'react-dom/client';
import { Outlet } from 'react-router';
import { RouterProvider } from 'react-router';
import router from './routes';

// 应用入口
export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

const root = createRoot(document.getElementById('app') || document.body);
root.render(<RouterProvider router={router} />);
