import React from 'react';
import Header from './header';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function Admin() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
          width: '40%',
          height: '80%',
          margin: '10px',
          borderRadius: '10px',
          color: 'black',
          background: activeButton === "gestionProductos" ? '#EF5F10' : '#EB7433',
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = activeButton === "gestionProductos" ? '#EF5F10' : '#EB7433';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          if (activeButton !== "gestionProductos") {
            e.target.style.background = '#EB7433';
            e.target.style.color = 'initial';
          }
        }}
        onClick={handleGestionProductos}
      >
      Gestión de productos
      </Button>
      <Button
        size="lg"
        style={{
          width: '40%',
          height: '80%',
          margin: '10px',
          borderRadius: '10px',
          color: 'black',
          background: activeButton === "gestionTrabajadores" ? '#EF5F10' : '#EB7433',
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = activeButton === "gestionTrabajadores" ? '#EF5F10' : '#EB7433';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          if (activeButton !== "gestionTrabajadores") {
            e.target.style.background = '#EB7433';
            e.target.style.color = 'initial';
          }
        }}
        onClick={handleGestionTrabajadores}
      >
        Gestión de trabajadores
      </Button>
      </div>
    </>
  );
}
export default Admin;







