import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import plusIcon from '../assets/add_FILL0_wght400_GRAD0_opsz24.svg';
import removeIcon from '../assets/remove_FILL0_wght400_GRAD0_opsz24.svg';

function MenuOrders({ onAddToCart, onRemoveToCart, onAddName }) {
  const [productsToShow, setProductsToShow] = useState([]);
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
    const breakfast = products.filter((product) => product.type === 'Desayuno' || product.type === 'desayuno')
    setProductsToShow(breakfast);
  };

  const handleAlmuerzoCenaClick = () => {
    setActiveButton("almuerzoCena");
    const lunch = products.filter((product) => product.type === 'Almuerzo' || product.type === 'almuerzo')
   setProductsToShow(lunch);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  const handleRemoveToCart = (product) => {
onRemoveToCart(product);
  };

  const handleClientName = (value) => {
    onAddName(value);
    console.log('cambio')
  }

  return (
    <>
      
      <div>
        <Button
          size="lg"
          style={{
            width: '35%',
            height: '80%',
            margin: '10px',
            borderRadius: '10px',
            color: 'white',
            background: activeButton === "desayuno" ? '#171718' : '#EB7433',
            borderColor: '#EB7433',
            transition: 'background 0.3s, color 0.3s',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            textDecoration: activeButton === "desayuno" ? 'underline' : 'none'
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
            color: 'white',
            background: activeButton === "almuerzoCena" ? '#171718' : '#EB7433',
            borderColor: '#EB7433',
            transition: 'background 0.3s, color 0.3s',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            textDecoration: activeButton === "almuerzoCena" ? 'underline' : 'none'
          }}
          
          onClick={handleAlmuerzoCenaClick}
        >
          Almuerzo / Cena
        </Button>
      </div>
      <div style={{ width: '80%', margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <input onChange={(e) => {
          handleClientName(e.target.value)
        }}
          placeholder="Cliente:"
          style={{ height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%', color: 'black', border: 'none', borderRadius: '5px'}}
       />
      </div>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productsToShow.map((product) => (
          <div key={product.id} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', backgroundColor: 'white', width: '90%', height: '60px', padding: '10px', margin: '10px', borderRadius: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '10%' }} />
            <h3 style={{ fontSize: '16px' }}>{product.name}</h3>
            <p>${product.price}</p>
            <section style={{display:'flex',flexDirection:'row'}}>
              <div onClick={() => handleRemoveToCart(product)}
                style={{ width: '40px', height:'40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={removeIcon} alt="add" />
              </div>
              <div onClick={() => handleAddToCart(product)}
                style={{width: '40px', height:'40px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', borderRadius:'50%', background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={plusIcon} alt="remove" />
              </div>
              </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default MenuOrders;
