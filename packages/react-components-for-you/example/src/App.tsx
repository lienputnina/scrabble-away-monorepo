import { FC, useState } from 'react';
import { Button } from '@liene-putnina/react-components-for-you';

import reactLogo from './assets/react.svg';
import './App.scss';

const App: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="App-reactLogo" alt="reactLogo" />
        <p>Hello Vite + React!</p>
        <p>
          <Button onClick={() => setCount((currentCount) => currentCount + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
};

export default App;
