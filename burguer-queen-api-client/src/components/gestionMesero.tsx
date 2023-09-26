import { useEffect, useState } from 'react';
import Header from './header';
import MeseroNav from './meseroNavegacion';
function Orders() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };
  const [orders, setOrders] = useState([]); // Estado para almacenar las órdenes
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
          setOrders(data); // Guarda las órdenes en el estado
        } else {
          console.error('Error al cargar órdenes');
        }
      } catch (error) {
        console.error('Error en la solicitud de órdenes:', error);
      }
    };
    fetchOrders();
  }, [token]);

  
  return (
    <>
      <Header />
      <MeseroNav />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
        <div style={{ width: '40%' }}>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          {orders.map((order) => (
            <div key={order.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h2>Cliente: {order.client}</h2>
              <p>ID del Pedido: {order.id}</p>
              <p>Estado: {order.status}</p>
              <p>Fecha de Entrada: {order.dataEntry}</p>
              <p>Fecha de Procesamiento: {order.dateProcessed || 'N/A'}</p>
              <h3>Productos:</h3>
              <ul>
                {order.products.map((product) => (
                  <li key={product.product.id}>
                    <p>Nombre del Producto: {product.product.name}</p>
                    <p>Cantidad: {product.qty}</p>
                    <p>Precio: ${product.product.price}</p>
                    <p>Tipo: {product.product.type}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Orders;

