// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import ServicesList from '../components/ServicesList';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener datos del usuario
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
        navigate('/login'); // Redirigir al inicio de sesión si hay un error
      }
    };

    // Obtener los servicios contratados por el usuario
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/services/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios contratados', error);
      }
    };

    fetchUser();
    fetchServices();
  }, [navigate]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Perfil de Usuario</h1>
      </header>

      <section className="profile-info">
        <UserProfile user={user} />
      </section>

      <section className="user-services">
        <h2>Servicios Contratados</h2>
        <ServicesList services={services} />
      </section>
    </div>
  );
};

export default ProfilePage;
