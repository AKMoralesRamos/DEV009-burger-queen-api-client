import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import logo from '../images/burger-queen-logo.png';

function HeaderLogin() {
    
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
       
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderLogin;