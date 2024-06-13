const Request = require('../models/Request');
const Service = require('../models/Service');
const authService = require('../services/authService');

exports.requestService = async (req, res) => {
  try {
    // Extraer el token del encabezado de autorización
    const token = authService.extractToken(req)

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token y obtener el ID del usuario
    const userId = authService.verifyToken(token);
    if (!userId) {
      console.log('UserId:', userId);  // Línea de depuración
      return res.status(401).json({ message: 'Token inválido' });
    }

    const { date } = req.body;
    const serviceId = req.params.id;

    // Encontrar el servicio solicitado
    const service = await Service.findById(serviceId).populate('supplier');
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    // Crear la nueva solicitud
    const newRequest = new Request({
      client: userId,
      service: serviceId,
      date,
      status: 'pending'
    });

    // Guardar la solicitud en la base de datos
    await newRequest.save();

    // Notificar al proveedor sobre la solicitud (esto puede ser una lógica adicional)
    // Ejemplo: enviar correo electrónico, notificación push, etc.

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener todas las solicitudes (opcional)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('client').populate('service');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para obtener una solicitud por usuario
exports.getRequestsByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const requests = await Request.find({ client: userId }).populate('service');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para actualizar el estado de una solicitud (aceptar, rechazar, completar)
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const requestId = req.params.id;

    // Encontrar la solicitud
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Actualizar el estado de la solicitud
    request.status = status;
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para confirmar la solicitud por parte del proveedor
exports.confirmRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.userId; // ID del usuario autenticado (proveedor)

    // Buscar la solicitud y el servicio asociado
    const request = await Request.findById(requestId).populate('service');
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Verificar que el usuario autenticado sea el proveedor del servicio
    const service = await Service.findById(request.service._id);
    if (service.supplier.toString() !== userId) {
      return res.status(403).json({ message: 'No está autorizado para confirmar esta solicitud' });
    }

    // Actualizar el estado de la solicitud a 'accepted'
    request.status = 'accepted';
    await request.save();

    // Notificar al cliente sobre la confirmación de la solicitud (puede ser por correo electrónico, notificación push, etc.)
    // Aquí solo devolvemos la respuesta

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para marcar una solicitud como completada por parte del proveedor
exports.completeRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const userId = req.userId; // ID del usuario autenticado (proveedor)

    // Buscar la solicitud y el servicio asociado
    const request = await Request.findById(requestId).populate('service');
    if (!request) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Verificar que el usuario autenticado sea el proveedor del servicio
    const service = await Service.findById(request.service._id);
    if (service.supplier.toString() !== userId) {
      return res.status(403).json({ message: 'No está autorizado para completar esta solicitud' });
    }

    // Verificar que la solicitud esté aceptada antes de completarla
    if (request.status !== 'accepted') {
      return res.status(400).json({ message: 'La solicitud debe estar aceptada para ser completada' });
    }

    // Actualizar el estado de la solicitud a 'completed'
    request.status = 'completed';
    await request.save();

    // Notificar al cliente sobre la confirmación de la solicitud (puede ser por correo electrónico, notificación push, etc.)
    // Aquí solo devolvemos la respuesta

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


