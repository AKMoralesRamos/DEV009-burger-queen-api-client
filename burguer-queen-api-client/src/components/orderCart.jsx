import { useState, useEffect } from 'react';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';
import { format } from 'date-fns';


function OrderCart({ cart, clientName, onNewCart, sendOrder }) {
   const [totalOrder, setTotalOrder] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');
  const [orderDate, setOrderDate] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.ok) {
          await response.json();
          setProducts(products);
          
          // Guarda los productos en el estado
        } else {
          console.error('Error al cargar productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      }
    };
    const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd   HH:mm:ss'); // Formato ISO 8601
  setOrderDate(formattedDate);
    fetchProducts();
  }, [token]);

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

 
  useEffect(() => {
    let totalOrder = 0;
    for (const product of cart) {
      totalOrder += product.qty * product.price;
    }
  setTotalOrder(totalOrder);
  },
  )

  const handleDeleteProduct = (productId) => {
    onNewCart(productId);
  
  }
  const handleCancelOrder = () => {
    sendOrder("");
  }


  return (
    <>
      <div style={containerStyle}>
        <h5>Resumen de la orden</h5>
        <p><strong>Cliente:</strong> {typeof clientName === 'object' ? clientName.clientName : clientName}</p>
        <p><strong>Fecha de Entrada:</strong> {orderDate}</p>


        <div>
          {cart.map((product) => (
                     <div key={product.id} style={{ backgroundColor: 'white', width: '100%', height: '60px', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                     <img src={product.image} alt={product.name} style={{ maxWidth: '10%' }} />
                     <h3 style={{ fontSize: '16px' }}>{product.name}</h3>
                     <p>${product.price}</p>
                     <p>{product.qty}</p>
                     <p>{product.type}</p>
                     <div onClick={() => handleDeleteProduct(product.id)} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={deleteIconSvg} alt="delete" />
              </div>
                   </div>
          ))}
        <div>Total: ${totalOrder}</div>
        <button style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}} onClick={() => handleCancelOrder()}>Cancelar</button>
          <button onClick= {() => sendOrder()} style={{ margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>Enviar</button>
         
        </div>
      </div>
    </>
  );
}

export default OrderCart;