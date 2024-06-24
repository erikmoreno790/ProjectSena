// Importaciones necesarias
import React from 'react';
import RegistroForm from '../components/RegistroForm';

// Estilos opcionales
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <header className="register-header">
        <h1>Registro de Usuario</h1>
      </header>

      <section className="register-form-section">
        <RegistroForm />
      </section>
    </div>
  );
};

export default RegisterPage;
