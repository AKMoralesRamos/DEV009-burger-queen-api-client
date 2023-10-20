import { useState } from "react";
import Header from "./header";
import MeseroNav from "./meseroNavegacion";
import MenuOrders from "./menuOrders";
import OrderCart from "./orderCart";
import { format } from 'date-fns';


function Orders() {
  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState('');

  const containerStyle = {
    backgroundColor: "#FFAA6C",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "left",
    padding: "20px",
  };

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((element) => element.id === product.id);
    if(alreadyInCart) {
      setCart((previousState) => [
        ...previousState.map((element) =>
          element.id === product.id
            ? { ...element, qty: element.qty + 1 }
            : element
        ),
      ]);
    } else {
      setCart([...cart, {...product, qty: 1}]);
    }
  };

  const handleRemoveToCart = (product) =>{
    const alreadyInCart = cart.some((element) => element.id === product.id);
    if(alreadyInCart) {
      setCart((previousState) => [
        ...previousState.map((element) =>
          element.id === product.id
            ? { ...element, qty: Math.max(element.qty - 1, 1) }
            : element
        ),
      ]);
    } 
  };
  

  const handleClientName = (value) => {
    const lettersOnly = value.replace(/[^A-Za-z]/g, ' ').toUpperCase();
      setClientName(lettersOnly);
  }
  const handleDeleteProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    console.log(updatedCart);
  };
  const token = localStorage.getItem('authToken');
  const handleCreateOrder = async () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd    HH:mm:ss');

    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          userId: 1,
          client: clientName,
          status: "pending",
          dateEntry: formattedDate,
          products: cart.map((product) => ({
            name: product.name, // Nombre del producto
            price: product.price, // Precio del producto
            type: product.type, // Tipo del producto
            qty: product.qty,// Otros campos si los tienes
          })),
      
       
        }),
      });
      if (response.ok) {
        await response.json();
       
        console.log('orden creada');
        setCart([]);
        setClientName('');
       
      } else if(!response.ok){
        setErrorMessage('Error al mostrar orden');
      }
    } catch (error) {
      console.error('Error al enviar orden:', error);
    }
  };
  return (
    <>
      <Header />
      <MeseroNav />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
        <div style={{ width: "50%" }}>
          <MenuOrders onAddToCart={handleAddToCart} onRemoveToCart={handleRemoveToCart} onAddName={handleClientName} />
        </div>
        <div style={{ width: "50%" }}>
          <OrderCart cart={cart} clientName={clientName} onNewCart={handleDeleteProduct} sendOrder={handleCreateOrder}/>
        </div>
      </div>
    </>
  );
}
export default Orders;
