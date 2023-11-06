import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../assets/burger-queen-logo.png';
import { useNavigate } from 'react-router-dom';
import logOutIcon from '../assets/logout_FILL0_wght400_GRAD0_opsz24.svg';
import homeIcon from '../assets/home_FILL0_wght400_GRAD0_opsz24.svg';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const back = useNavigate();
  const handleBack = () => {
    back('/home');
  };

  return (
    <>
      <Navbar
        className="bg-dark"
        style={{ margin: '0', padding: '0', width: '100%', height: '100%', display: 'flex' }}
      >
        <Container
          style={{ margin: '0', padding: '0', width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <Navbar.Brand href="#home">
            <img alt="" src={logo} width="250px" height="100px" className="d-inline-block align-top" />
          </Navbar.Brand>

          <div style={{ display: 'flex', gap: '50px' }}>
            <img onClick={handleBack} src={homeIcon} alt="Home" width="30" height="30" />
            <img onClick={handleLogout} src={logOutIcon} alt="Logout" width="30" height="30" />
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;