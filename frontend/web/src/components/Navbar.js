// Importamos las librerías necesarias
import React from 'react';
import { Link } from 'react-router-dom';

// Componente Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Enlaces a otras páginas */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/services">Servicios</Link>
        </li>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
      </ul>

      {/* Menús desplegables para navegación móvil */}
      <div className="navbar-mobile">
        <button className="navbar-toggle">
          <span className="navbar-icon">&#9776;</span>
        </button>
        <ul className="navbar-dropdown">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/services">Servicios</Link>
          </li>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li>
            <Link to="/register">Registrarse</Link>
          </li>
        </ul>
      </div>

      {/* Opciones para iniciar sesión y registrarse */}
      <div className="navbar-auth">
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/register">Registrarse</Link>
      </div>
    </nav>
  );
};

export default Navbar;
