import React, { useState, useEffect } from 'react';
import { db, auth } from './firebaseConfig';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        console.log('Productos en AdminPanel:', productsList);
      } catch (error) {
        console.error('Error obteniendo productos en AdminPanel:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = { name, price: parseFloat(price), stock: parseInt(stock), image };
    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
      console.log('Producto añadido:', newProduct);
    } catch (error) {
      console.error("Error añadiendo producto:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(product => product.id !== id));
      console.log('Producto eliminado:', id);
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        email: newUserEmail,
        role: newUserRole
      });
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('user');
      alert('Usuario creado exitosamente');
    } catch (error) {
      console.error("Error creando el usuario:", error);
      alert('Error al crear el usuario');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="add-product-form">
        <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
        <input type="text" placeholder="Imagen URL" value={image} onChange={e => setImage(e.target.value)} />
        <button onClick={handleAddProduct}>Agregar Producto</button>
      </div>
      <h3>Lista de Productos</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.stock}
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h2>Crear Usuario</h2>
      <div className="create-user-form">
        <input type="email" placeholder="Email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} />
        <select value={newUserRole} onChange={e => setNewUserRole(e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <button onClick={handleCreateUser}>Crear Usuario</button>
      </div>
    </div>
  );
}

export default AdminPanel;
