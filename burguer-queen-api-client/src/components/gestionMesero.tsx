import { useEffect, useState } from 'react';
import Header from './header';
import { useNavigate } from 'react-router-dom';
import returnBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MeseroNav from './meseroNavegacion';
import { format } from 'date-fns';
//mesero
function OrdersReady() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
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

  const confirmDelete = async () => {
    if (orderToDelete) {
      try {
        const response = await fetch(`http://localhost:8080/orders/${orderToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.ok) {
          // Eliminar la orden de la lista de órdenes
          setOrders(orders.filter((order) => order.id !== orderToDelete));
        } else {
          console.error('Error al eliminar la orden');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de eliminación:', error);
      }

      // Cerrar el modal después de eliminar
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Header />
      <div style={containerStyle}>
        <h2 style={{ borderBottom: '2px solid black' }}>GESTIÓN DE PEDIDOS</h2>
        <section style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div
            onClick={handleNewOrder}
            style={{
              width: '140px',
              height: '40px',
              borderRadius: '10px',
              marginRight: '10px',
              background: '#EB7433',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor:'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <img src={returnBack} alt="return" /><strong>Nueva Orden</strong>
          </div>
        </section>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', height: 'auto' }}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  width: '100%',
                  margin: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                <p><strong>ID del Pedido:</strong> {order.id}</p>
                <p><strong>ID Usuario:</strong> {order.userId}</p>
                <p><strong>Cliente:</strong> {order.client}</p>
                <p><strong>Fecha de Entrada:</strong> {order.dateEntry}</p>
                <p><strong>Fecha de Procesamiento:</strong> {order.dateProcessed || 'N/A'}</p>
                {order.products.length > 0 ? (
                  <>
                    <fieldset style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', minHeight: 'auto', border: '4px solid black', borderRadius: '5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <table style={{ border: '1px solid black', width: '100%' }}>
                          <thead>
                            <tr>
                              <th style={{ border: '1px solid black', padding: '5px' }}>Nombre del Producto</th>
                              <th style={{ border: '1px solid black', padding: '5px' }}>Cantidad</th>
                              <th style={{ border: '1px solid black', padding: '5px' }}>Precio</th>
                              <th style={{ border: '1px solid black', padding: '5px' }}>Tipo</th>

                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product) => (
                              <tr key={product.product?.id}>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.name}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.qty}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.price}</td>
                                <td style={{ border: '1px solid black', padding: '5px' }}>{product.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                     {/*  <p>{showElapsedTime(order)}</p> */}
                    </fieldset>
                    <div style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                      <button
                        style={{ backgroundColor: getStatusButtonStyle(order.status).color, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', width: '130px', margin: '10px' }}
                        onClick={() => toggleOrderStatus(order.id, order.status)}
                      >
                        {getStatusButtonStyle(order.status).text}
                      </button>
                      <button
                        style={{ width: '130px', margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setOrderToDelete(order.id);
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            ))
          ) : (
            <p>No hay órdenes disponibles.</p>
          )}
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton style={{ background: '#EB7433' }}>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta orden?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OrdersReady;
