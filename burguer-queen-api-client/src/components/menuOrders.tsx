import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function MenuOrders({ onAddToCart }) {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
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
          const data = await response.json();
          setProducts(data); // Guarda los productos en el estado
        } else {
          console.error('Error al cargar productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      }
    };
    fetchProducts();
  }, [token]);

  const [activeButton, setActiveButton] = useState(null);

  const handleDesayunoClick = () => {
    setActiveButton("desayuno");
    // Realiza las acciones relacionadas con el botón "Desayuno" aquí, si es necesario.
  };

  const handleAlmuerzoCenaClick = () => {
    setActiveButton("almuerzoCena");
    // Realiza las acciones relacionadas con el botón "Almuerzo/Cena" aquí, si es necesario.
  };

  const handleAddToCart = (product) => {
    console.log('escucho');
    onAddToCart(product);
  };

  return (
    <>
      <div style={{ width: '80%', margin: '10px' }}>
        <input
          placeholder="Cliente:"
          style={{ backgroundColor: 'white', width: '100%', color: 'black' }}
        />
      </div>
      <div>
        <Button
          size="lg"
          style={{
            width: '35%',
            height: '80%',
            margin: '10px',
            borderRadius: '10px',
            color: 'black',
            background: activeButton === "desayuno" ? '#EF5F10' : '#EB7433',
            borderColor: '#EB7433',
            transition: 'background 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = activeButton === "desayuno" ? '#EF5F10' : '#EB7433';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== "desayuno") {
              e.target.style.background = '#EB7433';
              e.target.style.color = 'initial';
            }
          }}
          onClick={handleDesayunoClick}
        >
          Desayuno
        </Button>
        <Button
          size="lg"
          style={{
            width: '50%',
            height: '80%',
            margin: '10px',
            borderRadius: '10px',
            color: 'black',
            background: activeButton === "almuerzoCena" ? '#EF5F10' : '#EB7433',
            borderColor: '#EB7433',
            transition: 'background 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = activeButton === "almuerzoCena" ? '#EF5F10' : '#EB7433';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== "almuerzoCena") {
              e.target.style.background = '#EB7433';
              e.target.style.color = 'initial';
            }
          }}
          onClick={handleAlmuerzoCenaClick}
        >
          Almuerzo / Cena
        </Button>
      </div>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ backgroundColor: 'white', width: '90%', height: '60px', padding: '10px', margin: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '10%' }} />
            <h3 style={{ fontSize: '16px' }}>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Agregar</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuOrders;
