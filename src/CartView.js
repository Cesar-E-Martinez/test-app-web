import React from 'react';

const CartView = ({ cart, closeCart, handlePurchase }) => (
  <div className="cart-view">
    <h2>Carrito de Compras</h2>
    {cart.length === 0 ? (
      <p>El carrito está vacío.</p>
    ) : (
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    )}
    <button onClick={closeCart} className="close-cart-button">Cerrar</button>
    {cart.length > 0 && (
      <button onClick={handlePurchase} className="purchase-button">Realizar Compra</button>
    )}
  </div>
);

export default CartView;
