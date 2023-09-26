/* import { useState, useEffect } from 'react'; */
import Header from './header';
import MeseroNav from './meseroNavegacion';
import MenuOrders from './menuOrders';
import OrderCart from './orderCart';

function Orders() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'left',
    padding: '20px',
  };
  
  return (
    <>
      <Header />
      <MeseroNav />
      <div style={containerStyle}>
        <div className="d-grid gap-4 "></div>
       <div style={{width: '50%'}}><MenuOrders /></div> 
       <div style={{width: '50%'}}><OrderCart /></div>
      </div>
    </>
  );
}
export default Orders;
