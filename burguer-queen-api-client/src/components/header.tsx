import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function Header() {
  return (
    <>
      <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="C:\\Users\\ceci_\\OneDrive\\Escritorio\\BQAC\\DEV009-burger-queen-api-client\\burguer-queen-api-client\\images\\image-removebg-preview (24).png"
              width="60"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;