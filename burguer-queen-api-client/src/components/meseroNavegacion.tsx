import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import returnBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg';
import gestionGo from '../assets/arrow_forward_FILL0_wght400_GRAD0_opsz24.svg';

function MeseroNav() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const navigate = useNavigate();

  const handleGestionMesero = () => {
    navigate("/gestionMesero");
    setActiveButton("gestionMesero");
  };



  return (
    <div style={containerStyle}>
      <div className="d-grid gap-4 "></div>
      <h2 style={{ display:'flex', borderBottom: '2px solid black', marginTop:'15px' }}>NUEVA ORDEN</h2>
       <section style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
  <div onClick={handleGestionMesero} style={{
   width: '140px',
   height: '40px',
    borderRadius: '10px',
    marginRight: '10px',
    background: '#EB7433',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  }}>
    <strong>Pedidos</strong><img src={gestionGo} alt="gestionGo" />
  </div>
</section>
    </div>
  );
}

export default MeseroNav; 