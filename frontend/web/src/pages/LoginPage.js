// Importaciones necesarias
import React from 'react';
import LoginForm from '../components/LoginForm';

// Estilos opcionales
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Iniciar Sesión</h1>
      </header>

      <section className="login-form-section">
        <LoginForm />
      </section>
    </div>
  );
};

export default LoginPage;
