import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App.jsx'
import './index.css'
  



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>,
  document.getElementById('root')
);


/* const rootElement = document.getElementById('root') as HTMLElement;
const appRoot = ReactDOM.createRoot(rootElement);

appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

/* ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <App />
  </React.StrictMode>,
  document.getElementById('root')
); */
