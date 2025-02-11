import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import hamburger from '../assets/destacda-hamburguesa-recortada.jpg'
import HeaderLogin from './headerLogin';
function FormLogin() {
 const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearErrorMessage = () => {
    setErrorMessage('');
  };

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
        console.log(concat);
        localStorage.setItem('authToken', concat);
        console.log('Inicio de sesión exitoso');
       /*  window.history.pushState({}, '', `${window.location.origin}/home`);
        window.dispatchEvent(new PopStateEvent('popstate')); */
        navigate("/home");
      } else if(!response.ok){
        setErrorMessage('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  return (
    <>
   <HeaderLogin />
    <div
    style={{
      backgroundImage: `url(${hamburger})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        backgroundColor: '#EC8133',
        padding: '50px',
        borderRadius: '5px',
        boxShadow: '9px 10px 13px -1px rgba(0,0,0,0.4)',
        marginLeft: '15%'
      }}
    >
      <h2 className="mb-5" style={{ fontSize: '24px', fontWeight: 'bold' }}>¡Bienvenid@!</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email"
        className="mb-4"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClick={clearErrorMessage}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Contraseña"
        className="mb-4">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={clearErrorMessage}
        />
      </FloatingLabel>
      <div className="mb-4" style={{ color: 'black' }}>{errorMessage}</div>
      <Button variant="dark" onClick={handleLogin} style={{  width: '90%',
    height: '50px',borderRadius: '10px' }}>
        Iniciar sesión
      </Button>
    </div>
  </div>
  </>
  );
}
export default FormLogin;