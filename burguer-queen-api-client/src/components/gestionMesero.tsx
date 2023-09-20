/* import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; */
import Header from './header';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';

function GestionMesero() {
  
    const containerStyle = {
      backgroundColor: '#FFAA6C',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    };
  
    const [orders, setOrders] = useState([]); // Estado para almacenar los productos
    const token = localStorage.getItem('authToken');
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:8080/orders', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setOrders(data); // Guarda los productos en el estado
          } else {
            console.error('Error al cargar productos');
          }
        } catch (error) {
          console.error('Error en la solicitud de productos:', error);
        }
      };
  
      fetchOrders();
    }, [token]);
  
    return (
      <>
        <Header />
        <div style={containerStyle}>
          <div className="d-grid gap-4 "></div>
          <div style={{ width: '100%' }}> 
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {orders.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
          </div>
      </>
    );
  }
  

export default GestionMesero;