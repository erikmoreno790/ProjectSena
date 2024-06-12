const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const requestController = require('../controllers/requestController');
const authService = require('../services/authService');

// Ruta para crear un nuevo servicio (protegida)
router.post('/', authService.verifyTokenMiddleware, serviceController.createService);

// Ruta para crear una nueva solicitud (protegida)
router.post('/:id/request', authService.verifyTokenMiddleware, requestController.requestService);

// Ruta para obtener todos los servicios (pública)
router.get('/', serviceController.getAllServices);

// Ruta para obtener un servicio por su ID (pública)
router.get('/:id', serviceController.getServiceById);

// Ruta para actualizar un servicio por su ID (protegida)
router.put('/:id', authService.verifyTokenMiddleware, serviceController.updateService);

// Ruta para eliminar un servicio por su ID (protegida)
router.delete('/:id', authService.verifyTokenMiddleware, serviceController.deleteService);

// Ruta para buscar servicios cerca de su ubicación actual, filtrando por categoría y precio.
router.get('/search', serviceController.searchServices);

module.exports = router;
