import { useEffect, useState } from 'react';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import returnBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg'
import MeseroNav from './meseroNavegacion';
import { format } from 'date-fns';
//mesero
function OrdersReady() {
  const navigate = useNavigate();

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
    color: 'green',
  });
  const getStatusButtonStyle = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'En proceso', color: '#E7372C' };
      case 'delivered':
        return { text: 'Entregado', color: '#93C32F' };
      case 'ready':
        return { text: 'Listo', color: '#F8CA23' };
      default:
        return { text: 'Estado', color: 'green' };
    }
  };
  const [orders, setOrders] = useState([]);
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
          setOrders(data);
        } else {
          console.error('Error al cargar órdenes');
        }
      } catch (error) {
        console.error('Error en la solicitud de órdenes:', error);
      }
    };
    fetchOrders();
  }, [token]);

  const handleNewOrder = () => {
navigate('/orders')
  }
  return (
    <>
      <Header />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
        <h2 style={{ borderBottom: '2px solid black' }}>GESTIÓN DE PEDIDOS</h2>
        <section style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div onClick={handleNewOrder} style={{
    width: '140px',
    height: '40px',
    borderRadius: '10px',
    marginRight: '10px',
    background: '#EB7433',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <img src={returnBack} alt="return" /><strong>Nueva Orden</strong>
  </div>
</section>
       
        <div style={{ width: '40%' }}>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', height: '20%' }}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} style={{ backgroundColor: '#EC8133', width: '150%', height: '30%', margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p>ID del Pedido: {order.id}</p>
                <p>ID Usuario: {order.userId}</p>
                <h5>Cliente: {order.client}</h5>
                <button
                  style={{ backgroundColor: getStatusButtonStyle(order.status).color, display: 'flex', marginLeft: 'auto', }}
                  onClick={() => {
                    // Lógica de cambio de estado o acción específica
                  }}
                >
                  {getStatusButtonStyle(order.status).text}
                </button>
                <p>Fecha de Entrada: {order.dateEntry}</p>
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
                          <tr key={product.product?.id}>
                            <td style={{ padding: '0 20px' }}>{product.name}</td>
                            <td style={{ padding: '0 20px' }}>{product.qty}</td>
                            <td style={{ padding: '0 20px' }}>${product.price}</td>
                            <td style={{ padding: '0 20px' }}>{product.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No hay órdenes disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default OrdersReady;
