import { useState } from "react";
import { Button } from "antd"
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<div>aaa</div>} />
        <Route path="about" element={<div>bbb</div>} />
      </Routes>
    </div>
  );
}

export default App;
