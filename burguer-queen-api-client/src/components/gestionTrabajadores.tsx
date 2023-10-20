import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Button from 'react-bootstrap/Button';
import addNewProduct from '../assets/add_FILL0_wght400_GRAD0_opsz24.svg';
import editIconSvg from '../assets/edit_square_FILL0_wght400_GRAD0_opsz24 (1).svg';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import returnBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg'

function Trabajadores () {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);
const [userToEdit, setUserToEdit] = useState(null);
const [newUser, setNewUser] = useState({
  email: "",
  password: "",
  role: "",
});
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
      const handleClose = () => {
      setShow(false);
      setUserToEdit(null);
      }
      

    /* const handleShow = () => {
      setShow(true);
    }; */
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

    
  const handleReturnToAdminPage = () => {
    navigate("/admin");
  };

  const handleEditUser = (userId) => {
    const user = workers.find((user) => user.id === userId);
    if (user) {
      setUserToEdit(user);
      setNewUser({ ...user, password: user.password }); // Rellena los campos con los datos del producto
      setShow(true); // Abre el modal para editar
    }
  }
  
  const handleShow = () => {
    setShow(true); // Abre el modal sin campos rellenados
    setNewUser({
      email: "",
      password: "",
      role: "",
    });
  };

  const handleSave = async () => {
    
    if (userToEdit) {
      // Si estás editando un usuario, realiza una solicitud PATCH
      try {
        const response = await fetch(`http://localhost:8080/products/${userToEdit.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newUser}),
        });
  
        if (response.ok) {
          // Actualiza la lista de usuarios después de editar uno
          const editedUserData = await response.json();
          setWorkers((prevUsers) => prevUsers.map((user) =>
            user.id === editedUserData.id ? editedUserData : user
          ));
          setShow(false);
          setUserToEdit(null);
        } else {
          console.error('Error al editar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud de edición del usuario:', error);
      }
    } else {
      // Si no estás editando un usuario, realiza una solicitud POST para agregar uno nuevo.
      try {
        const response = await fetch('http://localhost:8080/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newUser, /* password: user.password */ }),
        });
  
        if (response.ok) {
          // Actualiza la lista de productos después de agregar uno
          const newUserData = await response.json();
          setWorkers((prevUsers) => [...prevUsers, newUserData]);
          setShow(false);
        } else {
          console.error('Error al agregar el usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud de agregación del usuario:', error);
      }
    }
  };

  const isFormValid = newUser.email && newUser.password && newUser.role;
      return (
        <>
          <Header />
          <div style={containerStyle}>
            <div className="d-grid gap-4 "></div>
            <h2 style={{borderBottom: '2px solid black'}}>TRABAJADORES</h2>
            <section style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div onClick={handleReturnToAdminPage} style={{
    width: '90px',
    height: '40px',
    borderRadius: '10px',
    marginRight: '10px',
    background: '#EB7433',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  }}>
    <img src={returnBack} alt="return" />
  </div>
  <div onClick={handleShow} style={{
    width: '100px',
    height: '40px',
    borderRadius: '10px',
    background: '#EB7433',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  }}>
    <img src={addNewProduct} alt="add" />
    <strong>Agregar</strong>
  </div>
</section>
<div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {workers.map((user) => (
                  <div style={{ width: '45%', display: 'flex', flexDirection:'column', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '10px', fontSize: '16px', margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }} key={user.id}>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Usuario:</strong> {user.email}</p>
                  <p><strong>Contraseña:</strong> {user.password ? '*'.repeat(user.password.length) : 'No password set'}</p>
                  <p><strong>Rol:</strong> {user.role}</p>
                  <section style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <div onClick={() => handleEditUser(user.id)} style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', width: '50px', height:'50px', borderRadius:'50%', margin:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={editIconSvg} alt="edit" style={{ width: '25px', height: '25px' }}/>
              </div>
                  <div onClick={() => handleDeleteUser(user.id)} style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', width: '50px', height:'50px', borderRadius:'50%', margin:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={deleteIconSvg} alt="delete" style={{ width: '25px', height: '25px' }} />
              </div>
              </section>
                </div>
              ))}
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ background: '#EB7433' }}>
          <Modal.Title>{userToEdit ? 'Editar usuario' : 'Agregar nuevo usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                placeholder="nombre@example.com"
                value= {newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)",
                }}
              />
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                placeholder="Escribe al menos 6 carácteres"
                value= {newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", 
                }}
              />
              <Form.Label>Rol</Form.Label>
              <Form.Control
                placeholder="admin/mesero/chef"
                value= {newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", 
                }}
              />
            </Form.Group>
            {!isFormValid && (
            <p style={{ color: 'red', marginTop: '10px' }}>Por favor, complete todos los campos.</p>
          )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="dark" onClick={handleSave} disabled={!isFormValid}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
  <Modal.Header closeButton style={{ background: '#EB7433' }}>
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