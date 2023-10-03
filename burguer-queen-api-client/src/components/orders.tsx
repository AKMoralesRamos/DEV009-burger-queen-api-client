import { useState } from "react";
import Header from "./header";
import MeseroNav from "./meseroNavegacion";
import MenuOrders from "./menuOrders";
import OrderCart from "./orderCart";

function Orders() {
  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState([]);
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
            ? { ...element, quantity: element.quantity + 1 }
            : element
        ),
      ]);
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const handleRemoveToCart = (product) =>{
    const alreadyInCart = cart.some((element) => element.id === product.id);
    if(alreadyInCart) {
      setCart((previousState) => [
        ...previousState.map((element) =>
          element.id === product.id
            ? { ...element, quantity: Math.max(element.quantity - 1, 1) }
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
          <OrderCart cart={cart} clientName={clientName} onNewCart={handleDeleteProduct}/>
        </div>
      </div>
    </>
  );
}
export default Orders;
