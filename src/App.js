import { useState } from 'react';
import FirstComponent from './FirstComponent'
function App() {
  //consumo api de productos
  const [products, setProducts] = useState([]);
  fetch('https://server-deployment-3y52.onrender.com/getProducts', 
  {method: 'GET'
  })
    .then(response => response.json())
    .then(data => setProducts(data.products))
    .catch(error => console.log(error)) 
  return (
    <>
    <h1>Proyecto e-commerce</h1>
    <h2>Lista de productos</h2>
    {products.length === 0 ? <p>Cargando Productos</p> : products.map(product => 
    <div key = {product.id}>
    <ul>
      <li>ID:{product.id}</li>
      <li>Producto:{product.name}</li>
      <li>Precio : {product.price}</li>
      <li>Cantidad : {product.stock}</li>
    </ul>
    </div>)}
    <FirstComponent> </FirstComponent>
    </>
  );
}

export default App;
