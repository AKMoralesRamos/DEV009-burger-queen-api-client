import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../images/burger-queen-logo.png';
import { useNavigate } from 'react-router-dom';



function Header() {
     const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    }; 
    const back = useNavigate();
    const handleBack = () => {
      localStorage.clear();
      back("/home");
    }; 
  return (
    <>
      <Navbar className="bg-dark" style={{ margin: '0', padding: '0',  width: '100%', height: '100%',display: 'flex' }}>
        <Container style={{ margin: '0', padding: '0',  width: '100%' }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo} 
              width="250px"
              height="100px"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>

          <div className="ml-auto "> 
          <button className="comeBack-button custom-button-style"
          onClick={handleBack}
          style={{
            backgroundColor: '#EC8133', 
            color: 'white', 
            fontSize: '14px', 
            width: '80px', 
            height: '35px', 
            borderRadius: '5px',
            display:'flex',
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
          Volver
        </button> 
        <button className="logout-button custom-button-style"
          onClick={handleLogout}
          style={{
            backgroundColor: '#EC8133', 
            color: 'white', 
            fontSize: '14px', 
            width: '80px', 
            height: '35px', 
            borderRadius: '5px', 
            display:'flex',
            marginTop:'4px'
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
            
          Logout
        </button> 
      </div>
          
       
        </Container>
      </Navbar>
    </>
  );
}

export default Header;