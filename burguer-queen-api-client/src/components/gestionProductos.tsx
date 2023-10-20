import { useState, useEffect } from 'react';
//import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Button from 'react-bootstrap/Button';
import deleteIconSvg from '../assets/delete_FILL0_wght400_GRAD0_opsz24.svg';
import editIconSvg from '../assets/edit_square_FILL0_wght400_GRAD0_opsz24 (1).svg';
import addNewProduct from '../assets/add_FILL0_wght400_GRAD0_opsz24.svg';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';
import returnBack from '../assets/arrow_back_FILL0_wght400_GRAD0_opsz24.svg'

function Productos () {
  const [productsAdmin, setProductsAdmin] = useState([]);
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    type: "",
    dateEntry: "",
    image: "",
  });

 
  const handleReturnToAdminPage = () => {
      navigate("/admin");
    };

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

  const handleClose = () => {
    setShow(false);
    setProductToEdit(null);
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

  const handleSave = async () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  
    if (productToEdit) {
      // Si estás editando un producto (productToEdit está definido), realiza una solicitud PATCH
      try {
        const response = await fetch(`http://localhost:8080/products/${productToEdit.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newProduct, dateEntry: formattedDate }),
        });
  
        if (response.ok) {
          // Actualiza la lista de productos después de editar uno
          const editedProductData = await response.json();
          setProductsAdmin((prevProducts) => prevProducts.map((product) =>
            product.id === editedProductData.id ? editedProductData : product
          ));
          setShow(false);
          setProductToEdit(null);
        } else {
          console.error('Error al editar el producto');
        }
      } catch (error) {
        console.error('Error en la solicitud de edición del producto:', error);
      }
    } else {
      // Si no estás editando un producto, realiza una solicitud POST para agregar uno nuevo
      try {
        const response = await fetch('http://localhost:8080/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ ...newProduct, dateEntry: formattedDate }),
        });
  
        if (response.ok) {
          // Actualiza la lista de productos después de agregar uno
          const newProductData = await response.json();
          setProductsAdmin((prevProducts) => [...prevProducts, newProductData]);
          setShow(false);
        } else {
          console.error('Error al agregar el producto');
        }
      } catch (error) {
        console.error('Error en la solicitud de agregación del producto:', error);
      }
    }
  };

const handleEditProduct = (productId) => {
  const product = productsAdmin.find((product) => product.id === productId);
  if (product) {
    setProductToEdit(product);
    setNewProduct({ ...product }); // Rellena los campos con los datos del producto
    setShow(true); // Abre el modal para editar
  }
};

const handleShow = () => {
  setShow(true); // Abre el modal sin campos rellenados
  setNewProduct({
    name: '',
    price: '',
    type: '',
    dateEntry: '',
    image: '',
  });
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

      const isFormValid = newProduct.name && newProduct.price && newProduct.type && newProduct.image;
    return (
        <>
          <Header />
          <div style={containerStyle}>
            <div className="d-grid gap-4 "></div>
            <h2 style={{borderBottom: '2px solid black'}}>PRODUCTOS</h2>
            <section style={{ width: '95%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div onClick={handleReturnToAdminPage} style={{
    width: '90px',
    height: '40px',
    borderRadius: '10px',
    marginRight: '10px',
    background: '#EB7433',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }}>
    <img src={addNewProduct} alt="add" />
    <strong>Agregar</strong>
  </div>
</section>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {productsAdmin.map((product) => (
    <div style={{ width: '45%', display: 'flex', justifyContent: 'row', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px', padding: '10px', fontSize: '16px', margin: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }} key={product.id}>
      <section style={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{ width: '125px', height: '125px', background: '#171718',borderRadius: '50%', overflow: 'hidden', border: '5px solid #EB7433', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <div onClick={() => handleEditProduct(product.id)} style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px', background: '#EB7433', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
    <img src={editIconSvg} alt="edit" style={{ width: '30px', height: '30px' }} />
  </div>
  <div onClick={() => handleDeleteProduct(product.id)} style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#EB7433', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src={deleteIconSvg} alt="delete" style={{ width: '30px', height: '30px' }} />
  </div>
</div>
      </section>
      <section style={{ width: '60%', height: '100%', padding: '2px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
          <p style={{ minHeight: '40px', fontSize:'18px' }}><strong>ID:</strong> {product.id}</p>
          <p style={{ minHeight: '45px', fontSize:'16px' }}><strong>Nombre:</strong> {product.name}</p>
          <p style={{ minHeight: '30px' }}><strong>Precio:</strong> {product.price}</p>
          <p style={{ minHeight: '30px' }}><strong>Tipo:</strong> {product.type}</p>
          <p style={{ minHeight: '30px' }}><strong>Fecha de creación: </strong>{product.dateEntry}</p>
        </div>
      </section>
    </div>
  ))}
</div>
          </div>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton style={{ background: '#EB7433' }}>
  <Modal.Title>{productToEdit ? 'Editar producto' : 'Agregar nuevo producto'}</Modal.Title>
</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre del producto"
                value= {newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)",
                }}
              />
              <Form.Label>Precio</Form.Label>
              <Form.Control
                placeholder="$00.00"
                value= {newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)",
                }}
              />
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                placeholder="Desayuno/Almuerzo"
                value= {newProduct.type}
                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                autoFocus
                style={{
                  border: "1px solid #EB7433",
                  boxShadow: "2px 2px 5px rgba(235, 116, 51, 0.5)", 
                }}
              />
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                placeholder="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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
        <Modal.Header closeButton style={{background:'#EB7433'}}>
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