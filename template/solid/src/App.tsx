import type { Component } from "solid-js";
import logo from "./logo.png";

const App: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center h-screen gap-32">
      <img src={logo} class="w-96 h-96 animate-bounce" alt="logo" />
      <p class="font-bold tracking-wider uppercase text-slate-600 text-64">
        👋 Bagstack <span class="text-blue-800">Solid</span>
      </p>
    </div>
  );
};

export default App;
