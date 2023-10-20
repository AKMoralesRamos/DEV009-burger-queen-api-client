import '../App.css'
import Header from './header';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Home() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    with: '100%',
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
  const navigateJefedeCocina = useNavigate();
  const handleJefeDeCocina = () =>{
    navigateJefedeCocina("/jefeDeCocina");
  }
  
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
          color: 'white',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s', 
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#171718'; 
          e.target.style.color = 'white'; 
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; 
          e.target.style.color = 'initial'; 
      
        }}
        onClick={handleOrders}
      >
      <strong>Mesero</strong> 
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
          borderRadius: '10px',
          color: 'white',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#171718'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
        onClick={handleJefeDeCocina}
      >
      <strong>Jefe de cocina</strong>
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
          borderRadius: '10px',
          color: 'white',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#171718'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
        onClick={handleAdmin}
      >
       <strong>Admin</strong>
      </Button>
      </div>
  
  </div>
      </>
    );
  }

  export default Home;