import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setNombre(response.data.nombre);
        setUbicacion(response.data.ubicacion);
        setTelefono(response.data.telefono);
      } catch (error) {
        setError('Error al cargar perfil. Intenta de nuevo.');
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/users/profile', { nombre, ubicacion, telefono }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUser(response.data.user);
        setEditMode(false);
      }
    } catch (error) {
      setError('Error al actualizar perfil. Intenta de nuevo.');
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      {error && <p className="error">{error}</p>}
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancelar</button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Ubicación:</strong> {user.ubicacion}</p>
          <p><strong>Teléfono:</strong> {user.telefono}</p>
          <button onClick={() => setEditMode(true)}>Editar Perfil</button>
        </div>
      )}
      <h3>Servicios Contratados</h3>
      <ul>
        {user.servicios.map((servicio) => (
          <li key={servicio._id}>
            <p><strong>Nombre del Servicio:</strong> {servicio.nombre}</p>
            <p><strong>Descripción:</strong> {servicio.descripcion}</p>
            <p><strong>Estado:</strong> {servicio.estado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
