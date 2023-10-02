import { useState } from "react";
import Header from "./header";
import MeseroNav from "./meseroNavegacion";
import MenuOrders from "./menuOrders";
import OrderCart from "./orderCart";

function Orders() {
  const [cart, setCart] = useState([]);
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
    // estado debe ser seteado con un callback
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

  return (
    <>
      <Header />
      <MeseroNav />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
        <div style={{ width: "50%" }}>
          <MenuOrders onAddToCart={handleAddToCart} />
        </div>
        <div style={{ width: "50%" }}>
          <OrderCart cart={cart} />
        </div>
      </div>
    </>
  );
}
export default Orders;
