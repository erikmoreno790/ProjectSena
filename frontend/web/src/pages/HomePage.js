// Importaciones necesarias
import React from 'react';
import { Link } from 'react-router-dom';
import ServicesList from '../components/ServicesList';


const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Bienvenido a nuestra App de Servicios</h1>
        <p>Encuentra servicios domésticos cerca de ti rápidamente.</p>
      </header>

      <section className="homepage-links">
        <h2>Explora nuestros servicios</h2>
        <div className="links">
          <Link to="/services" className="link-button">Ver todos los servicios</Link>
          <Link to="/register" className="link-button">Regístrate como Proveedor</Link>
        </div>
      </section>

      <section className="featured-services">
        <h2>Servicios Destacados</h2>
        <ServicesList featured={true} /> {/* Crear lógica dentro de ServicesList para mostrar servicios destacados */}
      </section>
    </div>
  );
};

export default HomePage;
