import '../App.css'
import Header from './header';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Home() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
  };
  const navigate = useNavigate();
  const handleOrders = () => {
   // localStorage.clear();
    navigate("/orders");
  }; 
  const navigateAdmin = useNavigate();
  const handleAdmin = () => {
    //localStorage.clear();
    navigateAdmin("/admin");
  }; 
  
    return (
      <>
       <Header/>
       <div style={containerStyle}>   
    <div className="d-grid gap-4 ">
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
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
        onClick={handleOrders}
      >
      Mesero
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
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
      Jefe de cocina
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
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
        onClick={handleAdmin}
      >
        Admin
      </Button>
      </div>
  
  </div>
      </>
    );
  }

  export default Home;