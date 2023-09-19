import Button from 'react-bootstrap/Button';
//import { useNavigate } from 'react-router-dom';

function MeseroNav() {
    const containerStyle = {
      backgroundColor: '#FFAA6C',
      minHeight: '5vh',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start', 
      justifyContent: 'center',
    };
// Aquí podremos mostrar componentes para Nueva orden o Gestión de pedidos con eventos onclick
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
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s', 
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#EF5F10'; 
          e.target.style.color = 'white'; 
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; 
          e.target.style.color = 'initial'; 
      
        }}
      
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
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#EF5F10'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
        
      >
      Gestión de Pedidos
      </Button>
      </div>
    )}

    export default MeseroNav;