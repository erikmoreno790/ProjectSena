import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Asegúrate de importar tu hoja de estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Iniciar Sesión
      </button>
    </form>
  </div>

  );
};

export default Login;
