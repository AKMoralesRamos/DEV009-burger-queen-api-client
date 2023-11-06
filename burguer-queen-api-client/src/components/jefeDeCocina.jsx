//import React from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import { format } from 'date-fns';
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
            return { text: 'Pendiente', color: '#E7372C' };
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
        <h2 style={{ borderBottom: '2px solid black' }}>GESTIÓN DE COCINA</h2>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {orders.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {orders.map((order) => (
                <div key={order.id} style={{background: 'rgba(255, 255, 255, 0.5)', width: '40%', margin: '10px', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                  <p><strong>ID del Pedido:</strong> {order.id}</p>
                  <p><strong>ID Usuario:</strong> {order.userId}</p>
                  <p><strong>Cliente:</strong> {order.client}</p>
                  <p><strong>Fecha de Entrada:</strong> {order.dateEntry}</p>
                  <p><strong>Fecha de Procesamiento:</strong> {order.dateProcessed || 'N/A'}</p>
                  {order.products.length > 0 && (
                    <>
                      <fieldset style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', minHeight: '185px', border: '4px solid black', borderRadius: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <table style={{ border: '1px solid black', width: '100%' }}>
                            <thead>
                              <tr>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Nombre del Producto</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product) => (
                                <tr key={product.product?.id}>
                                  <td style={{ border: '1px solid black', padding: '5px' }}>{product.name}</td>
                                  <td style={{ border: '1px solid black', padding: '5px' }}>{product.qty}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p>{showElapsedTime(order)}</p>
                      </fieldset>
                      <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <button
                          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', backgroundColor: getStatusButtonStyle(order.status).color, width: '130px', margin: '10px' }}
                          onClick={() => toggleOrderStatus(order.id, order.status)}
                        >
                          {getStatusButtonStyle(order.status).text}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No hay órdenes disponibles.</p>
          )}
        </div>
      </div>
    </>
  );

}
export default JefeDeCocina;