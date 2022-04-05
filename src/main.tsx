import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import 'uno.css'
import 'antd/dist/antd.variable.min.css';
import { BrowserRouter } from "react-router-dom";
import "@/styles/ant"


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
