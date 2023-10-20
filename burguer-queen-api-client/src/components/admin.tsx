import React from 'react';
import Header from './header';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import productsImage from '../images/productoss.jpg';
import workersImage from '../images/workers.jpg';

function Admin() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const handleGestionProductos = () => {
    navigate("/gestionProductos");
    setActiveButton("gestionProductos");
  };
  const handleGestionTrabajadores = () => {
    navigate("/gestionTrabajadores");
    setActiveButton("gestionTrabajadores");
  };
  return (
    <>
      <Header />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
        <Button
  size="lg"
  style={{
    width: '30%', 
    height: '40vh', 
    margin: '20px',
    borderRadius: '10px', 
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${productsImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    border: 'none', 
    fontWeight: 'bold',
     color: 'white',
    cursor: 'pointer', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  }}
  onClick={handleGestionProductos}
>
  {/* <span style={{ fontWeight: 'bold', color: '#EB7433' }}> */}Gestión de productos{/* </span> */}
</Button>
<Button
  size="lg"
  style={{
    width: '30%', 
    height: '40vh', 
    margin: '20px',
    borderRadius: '10px',
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${workersImage})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    border: 'none', 
    color: 'white', 
    cursor: 'pointer', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  }}
  onClick={handleGestionTrabajadores}
>
  <span style={{ fontWeight: 'bold'}}>Gestión de trabajadores</span>
</Button>
      </div>
    </>
  );
}
export default Admin;







