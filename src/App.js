import React from "react";
import Rooting from "./routes/index";
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Rooting />
    </BrowserRouter>
  );
}

export default App;
