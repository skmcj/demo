import { createRoot } from 'react-dom/client';
import { useState } from 'react';

// 应用入口
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello React</h1>
      <img src="./static/images/cat.jpg" />
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count + 1</button>
    </>
  );
}

const root = createRoot(document.body);
root.render(<App />);
