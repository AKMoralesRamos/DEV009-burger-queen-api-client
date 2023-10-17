import { useState, useEffect } from 'react';
import React from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import addNewProduct from '../assets/add_FILL0_wght400_GRAD0_opsz24.svg';
import editIconSvg from '../assets/edit_square_FILL0_wght400_GRAD0_opsz24 (1).svg';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Trabajadores () {
  const [workers, setWorkers] = useState([]);
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWorkers(data); // Guarda los productos en el estado
        } else {
          console.error('Error al cargar gestión de usuarios');
        }
      } catch (error) {
        console.error('Error en la solicitud de usuarios:', error);
      }
    };
    fetchProducts();
  }, [token]);
    const containerStyle = {
        backgroundColor: '#FFAA6C',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
      };
      const handleClose = () =>
      setShow(false);
    const handleShow = () => {
      setShow(true);
    };
    const handleDeleteUser = (userId) => {
      setUserToDelete(userId);
      setShowConfirmationModal(true);
    };
    const confirmDelete = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.ok) {
          // Actualizar la lista de usuarios después de eliminar uno
          setWorkers(workers.filter(user => user.id !== userToDelete));
        } else {
          console.error('Error al eliminar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud de eliminación del usuario:', error);
      }
      setShowConfirmationModal(false);
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
              Trabajadores
            </Button>
            <div  onClick={handleShow} style={{ width: '90px', height:'40px', borderRadius:'10px', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src={addNewProduct} alt="add" />
          Agregar</div>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {workers.map((user) => (
                 <div style= {{background: 'white', borderRadius: '10px', padding:'10px',fontSize: '16px', margin:'10px'}} key={user.id}>
                  <p>ID: {user.id}</p>
                  <p>Usuario: {user.email}</p>
                  <p>Contraseña: {'*'.repeat(user.password.length)}</p>
                  <p>Rol: {user.role}</p>
                  <section style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <div /* onClick={() => handleEditUser(user.id)} */ style={{ width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={editIconSvg} alt="edit" />
              </div>
                  <div onClick={() => handleDeleteUser(user.id)} style={{ width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={deleteIconSvg} alt="delete" />
              </div>
              </section>
                </div>
              ))}
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                placeholder="nombre@example.com"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                placeholder="Escribe al menos 6 carácteres"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
              <Form.Label>Rol</Form.Label>
              <Form.Control
                placeholder="admin/mesero/chef"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Administrador</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    ¿Estás seguro de que deseas eliminar este usuario?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="dark" onClick={() => setShowConfirmationModal(false)}>
      Cancelar
    </Button>
    <Button variant="dark" onClick={confirmDelete}>
      Eliminar
    </Button>
  </Modal.Footer>
</Modal>
        </>
      );
}
export default Trabajadores;