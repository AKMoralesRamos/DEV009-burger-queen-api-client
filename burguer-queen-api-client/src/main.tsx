import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App.tsx'
import './index.css'

fetch('http://localhost:8080/orders')
  .then((response) => response.json())
  .then((data) => {
    // Una vez que se obtengan los datos, inicializa tu aplicación
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App orders={data} /> {/* Pasa los datos como propiedades */}
      </React.StrictMode>
    );
  })
  .catch((error) => {
    // Manejar errores de solicitud
    console.error('Error al obtener órdenes:', error);
  });
  
/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
 */