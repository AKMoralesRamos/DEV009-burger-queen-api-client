import React from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';

function Productos () {

    const containerStyle = {
        backgroundColor: '#FFAA6C',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px',
      };

    return (
    <>
    <Header />
    <div style={containerStyle}>
    <div className="d-grid gap-4 "></div>
   
    <Button
        size="lg"
        style={{
          width: '40%',
          height: '80%',
          margin: '10px',
          borderRadius: '10px',
          color: 'black',
          background:'#EB7433' ,
          borderColor: '#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        >
        Productos
      </Button>
      </div>
    </>
    );

}
export default Productos;