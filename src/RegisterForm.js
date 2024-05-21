import React, { useState } from 'react';

const RegisterForm = ({ handleRegister, error, setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => setShowRegister(false)} className="close-register-button">Cerrar</button>
    </div>
  );
};

export default RegisterForm;
