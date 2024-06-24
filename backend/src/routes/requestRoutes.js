const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authService = require('../services/authService');

// Ruta para obtener todas las solicitudes (opcional, protegida)
router.get('/', authService.verifyTokenMiddleware, requestController.getAllRequests);

// Ruta para obtener las solicitudes por usuario
router.get('/user/requests', authService.verifyTokenMiddleware, requestController.getRequestsByUser);

// Ruta para actualizar el estado de una solicitud (protegida)
router.put('/:id', authService.verifyTokenMiddleware, requestController.updateRequestStatus);

// Ruta para confirmar una solicitud (protegida)
router.put('/:id/confirm', authService.verifyTokenMiddleware, requestController.confirmRequest);

// Ruta para completar una solicitud (protegida)
router.put('/:id/complete', authService.verifyTokenMiddleware, requestController.completeRequest);

//Ruta para obtener los servicios contratados por usuario
router.get('/user/services', authService.verifyTokenMiddleware, requestController.getServicesByUserId);

module.exports = router;
