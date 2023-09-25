//import { useState, useEffect } from 'react';
import Header from './header';
import MeseroNav from './meseroNavegacion';


function Orders() {
  const containerStyle = {
    backgroundColor: '#FFAA6C',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };


  return (
    <>
      <Header />
      <MeseroNav />
      <div style={containerStyle}>
      </div>
    </>
  );
}

export default Orders;
