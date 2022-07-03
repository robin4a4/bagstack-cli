import React from 'react';

import logo from './logo.svg';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-32">
      <img src={logo} className="w-96 h-96 animate-bounce" alt="logo" />
      <p className="font-bold tracking-wider uppercase text-slate-600 text-64">
        👋 Bagstack <span className="text-cyan-300">React</span>
      </p>
    </div>
  );
}

export default App;
