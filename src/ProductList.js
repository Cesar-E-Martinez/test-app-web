import React from 'react';

const ProductList = ({ products, addToCart }) => (
  <div>
    <h1>Deco</h1>
    <h2>Lista de productos</h2>
    <div className="product-list">
      {products.length === 0 ? <p>Cargando Productos</p> : products.map(product =>
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p><span className="price">Precio:</span> ${product.price}</p>
            <p><span>Cantidad:</span> {product.stock}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ProductList;
