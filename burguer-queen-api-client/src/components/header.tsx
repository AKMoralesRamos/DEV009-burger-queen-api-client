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
  return (
    <>
      <Navbar className="bg-dark" style={{ margin: '0', padding: '0' }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo} 
              width="250px"
              height="100px"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <button className="logout-button"  onClick={handleLogout}>
          Logout
        </button> 
        </Container>
      </Navbar>
    </>
  );
}

export default Header;