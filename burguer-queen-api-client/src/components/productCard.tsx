import React from 'react';

function ProductCard({ product }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '10px', margin: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <img src={product.image} alt={product.name} style={{ maxWidth: '50%' }} />
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p>Tipo: {product.type}</p>
    </div>
  );
}

export default ProductCard;