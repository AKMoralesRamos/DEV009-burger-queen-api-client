import { useState, useEffect } from 'react';
import ProductCard from './productCard';

function NewOrder() {
    const containerStyle = {
        backgroundColor: '#FFAA6C',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      };
    
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
              console.log(data);
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


return (
    <>
    <div style={containerStyle}>
          <div className="d-grid gap-4 "></div>
          <div style={{ width: '40%' }}>
            <input
              placeholder="Cliente:"
              style={{ backgroundColor: 'white', width: '100%', color: 'black' }}
            />
          </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
    </>
)
          }
export default NewOrder;
