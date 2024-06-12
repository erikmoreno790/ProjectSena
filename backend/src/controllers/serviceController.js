// Importamos el modelo de servicio y el servicio de autenticación
const Service = require('../models/Service');
const authService = require('../services/authService');

// Controlador para crear un nuevo servicio
exports.createService = async (req, res) => {
  try {
    // Verificar el token y obtener el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const { title, description, category, price, location } = req.body;

    // Crear el nuevo servicio
    const newService = new Service({
      title,
      description,
      category,
      price,
      supplier: userId,
      location: {
        type: 'Point',
        coordinates: location.split(',').map(Number)
      }
    });

    // Guardar el servicio en la base de datos
    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener todos los servicios
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un servicio por su ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un servicio por su ID
exports.updateService = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    if (service.supplier.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar este servicio' });
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un servicio por su ID
exports.deleteService = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    if (service.supplier.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este servicio' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para buscar servicios cerca de su ubicación actual, filtrando por categoría y precio.
exports.searchServices = async (req, res) => {
  try {
    const { location, category, minPrice, maxPrice } = req.query;

    // Construir el filtro de búsqueda
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
    if (location) {
      filter.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: location.split(',').map(Number) },
          $maxDistance: 5000 // 5 km de radio
        }
      };
    }

    // Buscar servicios en la base de datos
    const services = await Service.find(filter).populate('supplier');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};