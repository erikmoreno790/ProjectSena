import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Obtener solicitudes realizadas por el usuario
        const requestsResponse = await axios.get('/api/requests/user/requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requestsResponse.data);

        // Obtener servicios contratados por el usuario
        const servicesResponse = await axios.get('/api/requests/user/services', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(servicesResponse.data);
      } catch (error) {
        setError('Error al cargar el historial. Intenta de nuevo.');
      }
    };

    fetchHistory();
  }, []);

  const handleCompleteRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/requests/${requestId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Actualizar el estado de la solicitud
      setRequests(requests.map(request => 
        request._id === requestId ? { ...request, status: 'completed' } : request
      ));
    } catch (error) {
      setError('Error al completar la solicitud. Intenta de nuevo.');
    }
  };

  if (!requests.length && !services.length) return <p>Cargando...</p>;

  return (
    <div className="history-container">
      <h2>Historial de Servicios y Solicitudes</h2>
      {error && <p className="error">{error}</p>}
      <div className="requests-section">
        <h3>Solicitudes Realizadas</h3>
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              <p><strong>Servicio:</strong> {request.service.title}</p>
              <p><strong>Fecha:</strong> {new Date(request.date).toLocaleString()}</p>
              <p><strong>Estado:</strong> {request.status}</p>
              {request.status === 'in progress' && (
                <button onClick={() => handleCompleteRequest(request._id)}>Marcar como Completado</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="services-section">
        <h3>Servicios Contratados</h3>
        <ul>
          {services.map(service => (
            <li key={service._id}>
              <p><strong>Servicio:</strong> {service.title}</p>
              <p><strong>Descripción:</strong> {service.description}</p>
              <p><strong>Precio:</strong> ${service.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
