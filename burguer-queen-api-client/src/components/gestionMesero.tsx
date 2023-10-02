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
  const [statusButton, setStatusButton] = useState({
    text: 'Estado',
    color: 'green', // Color por defecto o cualquier otro valor inicial
  });
  const getStatusButtonStyle = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'En proceso', color: '#E7372C' };
      case 'delivered':
        return { text: 'Entregado', color: '#93C32F' };
      case 'ready':
        return { text: 'Listo', color: '#F8CA23' };
    }
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',width:'50%',height:'20%', }}>
          
          {orders.map((order) => (
            <div key={order.id} style={{  backgroundColor: '#EC8133',width: '150%',height: '30%',margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p>ID del Pedido: {order.id}</p>
              <h5>Cliente: {order.client}</h5>
              <button
                style={{ backgroundColor: getStatusButtonStyle(order.status).color, display: 'flex',
                marginLeft: 'auto',}}
                onClick={() => {
                  // Puedes manejar aquí la lógica para cambiar el estado si es necesario
                  // Por ejemplo, puedes abrir un modal o realizar una acción específica.
                  // También puedes actualizar el estado del botón aquí si es necesario.
                }}
              >
                {getStatusButtonStyle(order.status).text}
              </button>
              <p>Fecha de Entrada: {order.dataEntry}</p>
              <p>Fecha de Procesamiento: {order.dateProcessed || 'N/A'}</p>
              {order.products.length > 0 && (
                <>
              <h5>Productos:</h5>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre del Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                       <th>Tipo</th>
                     </tr>
                   </thead>
                   <tbody>
                    {order.products.map((product) => (
                       <tr key={product.product.id}>
                         <td  style={{ padding: '0 20px' }}>{product.product.name}</td>
                         <td  style={{ padding: '0 20px' }}>{product.qty}</td>
                         <td  style={{ padding: '0 20px' }}>${product.product.price}</td>
                         <td  style={{ padding: '0 20px' }}>{product.product.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Orders;

