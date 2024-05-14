// App.js
import React, { useState, useEffect } from 'react';
import './styles.css'
import FirstComponent from './FirstComponent'

function App() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

//   fetch('https://server-deployment-3y52.onrender.com/getProducts', 
//   {method: 'GET'
//   })
//     .then(response => response.json())
//     .then(data => setProducts(data.products))
//     .catch(error => console.log(error)) 
  useEffect(() => {
    fetch('https://server-deployment-3y52.onrender.com/getProducts', 
    {method: 'GET'
    })
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.log(error));
  }, []);

  const handleLogin = () => {
    setError('');
    fetch('https://server-deployment-3y52.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          setLoggedIn(true);
        } else {
          setError('Credenciales incorrectas');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="login-container">
          <h2>Login</h2>
          <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Iniciar Sesión</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        // <div>
        //   <h1>Proyecto E-commerce</h1>
        //   <h2>Lista de productos</h2>
        //   {products.length === 0 ? <p>Cargando Productos</p> : products.map(product =>
        //     <div key={product.id}>
        //       <ul>
        //         <li>ID: {product.id}</li>
        //         <li>Producto: {product.name}</li>
        //         <li>Precio: {product.price}</li>
        //         <li>Cantidad: {product.stock}</li>
        //       </ul>
        //     </div>)}
        // </div>
        <div>
        <h1>Proyecto E-commerce</h1>
        <h2>Lista de productos</h2>
        <div className="product-list"> {/* Aplicamos la clase product-list para mostrar los productos en la cuadrícula */}
            {products.length === 0 ? <p>Cargando Productos</p> : products.map(product =>
            <div className="product-card" key={product.id}> {/* Aplicamos la clase product-card para cada tarjeta de producto */}
                <img src={product.image} alt={product.name} /> {/* Usamos una imagen del producto si está disponible */}
                <div className="product-info"> {/* Contenedor para la información del producto */}
                <h3>{product.name}</h3>
                <p><span className="price">Precio:</span> ${product.price}</p>
                <p><span>Cantidad:</span> {product.stock}</p>
                <FirstComponent> </FirstComponent>
                
                </div>
            </div>
            )}
        </div>
    </div>
      )}
    </div>
  );
}

export default App;
