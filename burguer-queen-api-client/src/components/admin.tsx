import Header from './header';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function admin() {
    return (
      <>
       <Header/>
        <h1>Hola, aquí vas a gestionar todo </h1>
      </>
    );
  }

export default admin;