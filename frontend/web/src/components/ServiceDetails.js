import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        // Obtener el servicio por su ID
        const serviceResponse = await axios.get(`/api/services/${serviceId}`);
        setService(serviceResponse.data);

        // Obtener las reseñas del servicio
        const reviewsResponse = await axios.get(`/api/reviews/service/${serviceId}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        setError('Error al cargar los detalles del servicio. Intenta de nuevo.');
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleRequestService = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/requests`, { serviceId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        navigate('/requests');
      }
    } catch (error) {
      setError('Error al solicitar el servicio. Intenta de nuevo.');
    }
  };

  if (!service) return <p>Cargando...</p>;

  return (
    <div className="service-details-container">
      <h2>{service.title}</h2>
      {error && <p className="error">{error}</p>}
      <p><strong>Descripción:</strong> {service.description}</p>
      <p><strong>Proveedor:</strong> {service.supplier?.nombre}</p>
      <p><strong>Ubicación:</strong> {service.location}</p>
      <p><strong>Precio:</strong> ${service.price}</p>
      <p><strong>Calificación:</strong> {service.rating} / 5</p>
      <button onClick={handleRequestService}>Solicitar Servicio</button>
      <button onClick={() => navigate(`/contact/${service.supplier?._id}`)}>Contactar Proveedor</button>
      <h3>Reseñas</h3>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <p><strong>{review.author.name}</strong>: {review.text}</p>
            <p><strong>Calificación:</strong> {review.rating} / 5</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDetails;
