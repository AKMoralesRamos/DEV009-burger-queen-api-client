import { useState, useEffect } from 'react';
//import React from 'react';
import Header from './header';
import Button from 'react-bootstrap/Button';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';
import editIconSvg from '../assets/edit_square_FILL0_wght400_GRAD0_opsz24 (1).svg';
import addNewProduct from '../assets/add_FILL0_wght400_GRAD0_opsz24.svg';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Productos () {
  const [productsAdmin, setProductsAdmin] = useState([]);
  const token = localStorage.getItem('authToken');
  const [show, setShow] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProductsAdmin(data); // Guarda los productos en el estado
        } else {
          console.error('Error al cargar gestión de productos');
        }
      } catch (error) {
        console.error('Error en la solicitud de productos:', error);
      }
    };
    fetchProducts();
  }, [token]);
  const handleClose = () =>
    setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowConfirmationModal(true);
  };
  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response.ok) {
        // Actualizar la lista de productos después de eliminar uno
        setProductsAdmin(productsAdmin.filter(product => product.id !== productToDelete));
      } else {
        console.error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación del producto:', error);
    }
    setShowConfirmationModal(false);
  };
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
            <div
          style={{
            width: '90px',
            height: '40px',
            borderRadius: '10px',
            marginRight: '10px',
            background: '#EB7433',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          // Abre el modal al hacer clic en el botón "Agregar"
          onClick={handleShow}
        >
          <img src={addNewProduct} alt="add" />
          Agregar
        </div>
            <div style={{ width: '100%', height: '100%', fontSize: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {productsAdmin.map((product) => (
                <div style= {{background: 'white', borderRadius: '10px', padding:'10px',fontSize: '16px', margin:'10px'}} key={product.id}>
                  <p>ID: {product.id}</p>
                  <p>Nombre: {product.name}</p>
                  <p>Precio: {product.price}</p>
                 {/*  <h3>{product.image}</h3> */}
                  <p>Tipo: {product.type}</p>
                  <p>Fecha de creación: {product.dateEntry}</p>
                  <section style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <div /* onClick={() => handleEditProduct(product.id)} */ style={{ width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={editIconSvg} alt="edit" />
              </div>
                  <div onClick={() => handleDeleteProduct(product.id)} style={{ width: '40px', height:'40px', borderRadius:'50%', marginRight:'10px',background:'#EB7433', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <img src={deleteIconSvg} alt="delete" />
              </div>
              </section>
                </div>
              ))}
            </div>
          </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre del producto"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
              <Form.Label>Precio</Form.Label>
              <Form.Control
                placeholder="$00.00"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                placeholder="Desayuno/Almuerzo"
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", // Usando el color #EB7433
                }}
              />
              <Form.Label>Fecha de creación</Form.Label>
              <Form.Control
                placeholder="aaaa/mm/dd"
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
          ¿Estás seguro de que deseas eliminar este producto?
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
export default Productos;