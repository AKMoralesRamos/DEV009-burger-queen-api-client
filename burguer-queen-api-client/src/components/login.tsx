import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './header';
import hamburger from '../images/destacda-hamburguesa.jpg'



function FormLogin() {
 const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken;
        const concat = `Bearer ${token}`;
        localStorage.setItem('authToken', concat);
        console.log('Inicio de sesión exitoso');
       /*  window.history.pushState({}, '', `${window.location.origin}/home`);
        window.dispatchEvent(new PopStateEvent('popstate')); */
        navigate("/home");
      } else {
        
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div
    style={{
      backgroundImage: `url(${hamburger})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: 'center', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Header />
    <div
      style={{
        backgroundColor: '#EC8133', 
        padding: '50px',
        borderRadius: '5px',
      }}
    >
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-4"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password"
        className="mb-4">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <Button variant="dark" onClick={handleLogin} style={{  width: '90%',
    height: '10%',borderRadius: '50px' }}>
        Iniciar sesión
      </Button>
    </div>
  </div>
  );
}

export default FormLogin;