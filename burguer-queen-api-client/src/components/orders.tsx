
import Header from './header';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function orders() {
    return (
      <>
       <Header/>
        <h1>Hola, aqui vas a visualizar órdenes de pedido</h1>
      </>
    );
  }

export default orders;