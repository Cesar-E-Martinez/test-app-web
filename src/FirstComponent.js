import React, { useState } from 'react';

const FirstComponent = () => {
    const [contador, setContador] = useState(0);
    const sumar = () => {
        setContador(contador + 1);
        console.log(contador);
    }
  return (
    <>
    <h3>Numero de productos agregados: {contador}</h3>
    <button onClick={sumar}>Agregar al carrito</button>
    </>

)}
export default FirstComponent;