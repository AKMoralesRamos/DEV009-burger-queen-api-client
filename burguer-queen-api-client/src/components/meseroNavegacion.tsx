import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function MeseroNav() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '5vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  };

  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(null);

  const handleGestionMesero = () => {
    navigate("/gestionMesero");
    setActiveButton("gestionMesero");
  };

  const handleNewOrder = () => {
    navigate("/orders");
    setActiveButton("newOrder");
  };

  return (
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
          background: activeButton === "newOrder" ? '#EF5F10' : '#EB7433',
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = activeButton === "newOrder" ? '#EF5F10' : '#EB7433';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          if (activeButton !== "newOrder") {
            e.target.style.background = '#EB7433';
            e.target.style.color = 'initial';
          }
        }}
        onClick={handleNewOrder}
      >
        Nueva Orden
      </Button>
      <Button
        size="lg"
        style={{
          width: '40%',
          height: '80%',
          margin: '10px',
          borderRadius: '10px',
          color: 'black',
          background: activeButton === "gestionMesero" ? '#EF5F10' : '#EB7433',
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = activeButton === "gestionMesero" ? '#EF5F10' : '#EB7433';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          if (activeButton !== "gestionMesero") {
            e.target.style.background = '#EB7433';
            e.target.style.color = 'initial';
          }
        }}
        onClick={handleGestionMesero}
      >
        Gestión de Pedidos
      </Button>
    </div>
  );
}

export default MeseroNav;