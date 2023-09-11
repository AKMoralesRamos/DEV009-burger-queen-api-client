/* function Login() {
    
  return (
    
      <>
        <h1>Hola, ingresa usuario y contraseña</h1>
      </>
    );
  }

export default Login; */

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function FormFloatingBasicExample() {
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      <Button variant="success">Iniciar sesión</Button>{' '}
    </>
    
  );
}


export default FormFloatingBasicExample;