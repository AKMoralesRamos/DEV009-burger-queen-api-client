import React from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
//cocina
function JefeDeCocina () {

    const containerStyle = {
        backgroundColor: '#FFAA6C',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        flexDirection: 'column',
        alignItems: 'center', 
     
      };
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

      const toggleOrderStatus = async (orderId, currentStatus) => {
        let newStatus;
        switch (currentStatus) {
          case 'pending':
            newStatus = 'ready';
            break;
          case 'ready':
            newStatus = 'delivered';
            break;
          case 'delivered':
            newStatus = 'pending';
            break;
          default:
            break;
        }
    
        try {
          const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ status: newStatus }),
          });
      
            if (response.ok) {
              const updatedOrder = orders.find((order) => order.id === orderId);
              if (updatedOrder) {
                updatedOrder.status = newStatus;
                setOrders([...orders]);
              }
          } else {
            console.error('Error al actualizar el estado de la orden');
          }
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
        }
      };

      // Función para calcular el tiempo transcurrido en minutos
  const calculateElapsedTime = (order) => {
    const arrivalTime = new Date(order.dateEntry);
    const completionTime = new Date(order.dateProcessed);

    // Calcular la diferencia en milisegundos
    const timeDifference = completionTime - arrivalTime;

    // Convertir la diferencia en milisegundos a minutos
    const minutes = Math.floor(timeDifference / (1000 * 60));

    return minutes;
  };
   // Función para mostrar el tiempo transcurrido en minutos si la orden está entregada
   const showElapsedTime = (order) => {
    if (order.status === 'delivered') {
      const elapsedTime = calculateElapsedTime(order);
      return `Tiempo de preparación: ${elapsedTime} minutos`;
    }
    return '';
  };


    return (
    <>
    <Header />
    <div style={containerStyle}>
    <div className="d-grid gap-4 "></div>
    <div style={{ width: '50%'}}>

   <Button
        size="lg"
        style={{
          width: '40%',
          height: '80%',
          margin: '10px',
          borderRadius: '10px',
          color: 'black',
          background:'#EB7433' ,
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        >
        Pedidos cocina
      </Button>
      </div>
   
      <div style={{ width: '40%' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', height: '20%' }}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} style={{ backgroundColor: '#EC8133', width: '150%', height: '30%', margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p>ID del Pedido: {order.id}</p>
                <p>ID Usuario: {order.userId}</p>
                <h5>Cliente: {order.client}</h5>
         
                  <button
                  style={{ backgroundColor: getStatusButtonStyle(order.status).color, display: 'flex', marginLeft: 'auto' }}
                  onClick={() => toggleOrderStatus(order.id, order.status)}
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
                    {/* Mostrar tiempo transcurrido solo para órdenes entregadas */}
          <p>{showElapsedTime(order)}</p>
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
export default JefeDeCocina;