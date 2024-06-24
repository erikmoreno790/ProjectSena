import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
        setFilteredServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services.filter(service => 
      service.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? service.category === category : true) &&
      (location ? service.location.includes(location) : true) &&
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredServices(filtered);
  }, [search, category, location, priceRange, sortOrder, services]);

  return (
    <div className="services-list-container">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Buscar servicios..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas las Categorías</option>
          <option value="cocina">Cocina</option>
          <option value="albañilería">Albañilería</option>
          <option value="reparación">Reparación</option>
          {/* Agregar más opciones según las categorías disponibles */}
        </select>
        <input 
          type="text" 
          placeholder="Ubicación" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="price-range">
          <label>Precio:</label>
          <input 
            type="number" 
            placeholder="Min" 
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input 
            type="number" 
            placeholder="Max" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Precio: Bajo a Alto</option>
          <option value="desc">Precio: Alto a Bajo</option>
        </select>
      </div>
      <div className="services-list">
        {filteredServices.map(service => (
          <div key={service._id} className="service-item">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Precio:</strong> ${service.price}</p>
            <p><strong>Ubicación:</strong> {service.location}</p>
            <p><strong>Calificación:</strong> {service.rating} / 5</p>
            <button>Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
