import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="tw-container tw-mx-auto tw-flex tw-flex-col tw-items-center">
      <h1 className="tw-mt-8">Vite + React</h1>
      <div className="tw-mt-12 tw-flex tw-flex-col tw-items-center">
        <button type="button" className="tw-p-2 tw-border tw-border-black" onClick={() => setCount((c) => c + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p className="tw-mt-4">
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
