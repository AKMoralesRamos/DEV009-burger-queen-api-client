//import { useState, useEffect } from 'react';
//import { InputValueContext } from './menuOrders';

function OrderCart () {
    const containerStyle = {
        backgroundColor: '#ffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'left',
        padding: '30px',
      };

   // const inputValue = useContext(InputValueContext);

  return (
    <>
          <div style={containerStyle}>
<h4>Resumen de la orden</h4>
{/* <h2>{inputValue}</h2> */}
<p>Cliente: </p>
<div>Total: </div>
<div><button style={{margin: '10px'}}>Enviar</button>
<button>Cancelar</button></div>

    </div>
    </>
  )  
}

export default OrderCart;