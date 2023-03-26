import React from 'react';
import './App.css';

const RemoteApp = React.lazy(() => import("Remote/App"));
const RemoteButton = React.lazy(() => import("Remote/Button"));

function App() {
  return (
    <div className="App">
      <h1>This is the Host!</h1>
      <h2>Remote App:</h2>

      <RemoteApp />

      <h2>Remote Button:</h2>

      <RemoteButton />
    </div>
  );
}

export default App;
