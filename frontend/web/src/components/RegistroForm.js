import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { nombre, email, password, tipo });
      if (response.data.success) {
        navigate.push('/login');
      }
    } catch (error) {
      setError('Error al registrar. Intenta de nuevo.');
    }
  };

  return (
    <div className="d-md-flex half">
      <div className="bg" style={{ backgroundImage: 'url(images/bg_1.jpg)' }}></div>
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="form-block mx-auto">
                <div className="text-center mb-5">
                  <h3 className="text-uppercase">Regístrate en <strong>Colorlib</strong></h3>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Tu Nombre" 
                      id="nombre" 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="your-email@gmail.com" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Your Password" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tipo">Tipo de Usuario</label>
                    <select 
                      className="form-control" 
                      id="tipo" 
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      <option value="cliente">Cliente</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <input type="submit" value="Regístrate" className="btn btn-block py-2 btn-primary" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
