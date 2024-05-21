import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cartCount, openCart }) => {
  return (
    <div className="cart-icon" onClick={openCart} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faShoppingCart} size="2x" /> {/* Icono del carrito */}
      <span className="cart-count">{cartCount}</span> {/* Mostrar el número de productos en el carrito */}
    </div>
  );
};

export default Cart;
