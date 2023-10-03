import { useState, useEffect } from 'react';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';

function OrderCart({ cart, clientName, onNewCart, sendOrder }) {
   const [totalOrder, setTotalOrder] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken');

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
    fetchProducts();
  }, [token]);

  const containerStyle = {
    backgroundColor: '#ffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'left',
    padding: '30px',
    borderRadius: '10px'
  };

 /*  const handleCount = (product) => {
    const updatedCounters = { ...productCounters };
    const currentCount = updatedCounters[product.id] || 0;
    // Incrementar el contador y actualizar el estado
    updatedCounters[product.id] = currentCount + 1;
    setProductCounters(updatedCounters);
  }; */
  

 /*  const handleUncount = (product) => {
    const updatedCounters = { ...productCounters };
    const currentCount = updatedCounters[product.id] || 0;
    // Decrementar el contador si es mayor que cero y actualizar el estado
    if (currentCount > 0) {
      updatedCounters[product.id] = currentCount - 1;
      setProductCounters(updatedCounters);
    }
  }
   */

  useEffect(() => {
    let totalOrder = 0;
    for (const product of cart) {
      /* const currentCount = productCounters[product.id] || 0; */
      totalOrder += product.qty * product.price;
    }
  setTotalOrder(totalOrder);
  },//[cart, productCounters]);
  )

  const handleDeleteProduct = (productId) => {
    onNewCart(productId);
  
  }

 /*  const handleSend = (cart) => {
    onSendOrder(cart);
  } */

  return (
    <>
      <div style={containerStyle}>
        <h4>Resumen de la orden</h4>
        <p>Cliente: {clientName}</p>
        <div>
          {cart.map((product) => (
                     <div key={product.id} style={{ backgroundColor: 'white', width: '90%', height: '60px', padding: '10px', margin: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                     <img src={product.image} alt={product.name} style={{ maxWidth: '10%' }} />
                     <h3 style={{ fontSize: '16px' }}>{product.name}</h3>
                     <p>${product.price}</p>
                     <p>{product.qty}</p>
                     <div onClick={() => handleDeleteProduct(product.id)} style={{ width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={deleteIconSvg} alt="delete" />
              </div>
                   </div>
          ))}
        <div>Total: ${totalOrder}</div>
        
          <button onClick= {() => sendOrder()} style={{ margin: '10px' }}>Enviar</button>
          <button>Cancelar</button>
        </div>
      </div>
    </>
  );
}

export default OrderCart;