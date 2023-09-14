import '../App.css'
import Header from './header';
import Button from 'react-bootstrap/Button';


function Home() {
  
    return (
      <>
       <div style={{ backgroundColor: '#FFAA6C', minHeight: '100vh' }}>
      <Header/>

      
    <div className="d-grid gap-2">
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
          borderRadius: '10px',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s', // Agrega una transición suave
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#EF5F10'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
      >
        Mesero
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
          borderRadius: '10px',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#EF5F10'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
      >
        Jefe de cocina
      </Button>
      <Button
        size="lg"
        style={{
          width: '554px',
          height: '80px',
          borderRadius: '10px',
          background: '#EB7433',
          borderColor:'#EB7433',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#EF5F10'; // Cambia el color de fondo al hacer hover
          e.target.style.color = 'white'; // Cambia el color del texto al hacer hover
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#EB7433'; // Restaura el color de fondo al salir del hover
          e.target.style.color = 'initial'; // Restaura el color del texto al salir del hover
      
        }}
      >
        Admin
      </Button>
      </div>
  
  </div>
      </>
    );
  }

  export default Home;