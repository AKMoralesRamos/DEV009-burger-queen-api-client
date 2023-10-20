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
    width: '30%', // Set a fixed width for square buttons
    height: '40vh', // Set the same height as the width for a square button
    margin: '20px',
    borderRadius: '10px', // Keep rounded corners if needed
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${productsImage})`, // Set the background image
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Center the image both horizontally and vertically
    border: 'none', // Remove the border
    fontWeight: 'bold',
     color: 'white',// Text color
    cursor: 'pointer', // Add a pointer cursor on hover
    display: 'flex', // Display as a flex container
    flexDirection: 'column', // Arrange items in a column
    alignItems: 'center', // Align items to the center
    justifyContent: 'flex-end', // Align items to the bottom
  }}
  onClick={handleGestionProductos}
>
  {/* <span style={{ fontWeight: 'bold', color: '#EB7433' }}> */}Gestión de productos{/* </span> */}
</Button>
<Button
  size="lg"
  style={{
    width: '30%', // Set a fixed width for square buttons
    height: '40vh', // Set the same height as the width for a square button
    margin: '20px',
    borderRadius: '10px', // Keep rounded corners if needed
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${workersImage})`, // Set the background image
    backgroundSize: 'cover', // Adjust this as needed
    backgroundPosition: 'center', // Center the image both horizontally and vertically
    border: 'none', // Remove the border
    color: 'white', // Text color
    cursor: 'pointer', // Add a pointer cursor on hover
    display: 'flex', // Display as a flex container
    flexDirection: 'column', // Arrange items in a column
    alignItems: 'center', // Align items to the center
    justifyContent: 'flex-end', // Align items to the bottom
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







