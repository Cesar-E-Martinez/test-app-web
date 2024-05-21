import React from 'react';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin, error, setShowLogin }) => (
  <div className="login-container">
    <h2>Login</h2>
    <input type="text" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} />
    <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
    <button onClick={handleLogin}>Iniciar Sesión</button>
    {error && <p className="error-message">{error}</p>}
    <button onClick={() => setShowLogin(false)} className="close-login-button">Cerrar</button>
  </div>
);

export default LoginForm;
