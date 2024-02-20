import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {AppProvider} from "./Components/Context.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <ToastContainer style={{fontSize:"1.5rem"}}/>
    <App />
  </AppProvider>,
)
