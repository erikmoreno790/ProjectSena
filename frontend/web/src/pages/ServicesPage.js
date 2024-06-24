// Importaciones necesarias
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ServicesList from '../components/ServicesList';
import ServiceDetails from '../components/ServiceDetails';
import { useParams } from 'react-router-dom';

// Estilos opcionales
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { serviceId } = useParams();

  useEffect(() => {
    // Obtener todos los servicios disponibles
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios', error);
      }
    };

    fetchServices();
  }, []);

  // Función para seleccionar un servicio específico
  const selectService = useCallback((id) => {
    const service = services.find(service => service._id === id);
    setSelectedService(service);
  }, [services]);

  // Mostrar detalles del servicio seleccionado si existe un ID de servicio en la URL
  useEffect(() => {
    if (serviceId) {
      selectService(serviceId);
    }
  }, [serviceId, selectService]);
  

  return (
    <div className="services-page">
      <header className="services-header">
        <h1>Servicios Disponibles</h1>
      </header>

      <section className="services-list-section">
        <ServicesList services={services} selectService={selectService} />
      </section>

      {selectedService && (
        <section className="service-details-section">
          <ServiceDetails service={selectedService} />
        </section>
      )}
    </div>
  );
};

export default ServicesPage;
