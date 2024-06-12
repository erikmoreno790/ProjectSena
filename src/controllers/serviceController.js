// Importamos el modelo de servicio y el servicio de autenticación
const Service = require('../models/Service');
const authService = require('../services/authService');

// Controlador para crear un nuevo servicio
exports.createService = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const newService = new Service({
      ...req.body,
      supplier: userId
    });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
