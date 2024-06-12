const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authService = require('../services/authService');

// Ruta para crear una nueva reseña (protegida)
router.post('/', authService.verifyTokenMiddleware, reviewController.createReview);

// Ruta para obtener todas las reseñas (pública)
router.get('/', reviewController.getAllReviews);

// Ruta para obtener una reseña por su ID (pública)
router.get('/:id', reviewController.getReviewById);

// Ruta para actualizar una reseña por su ID (protegida)
router.put('/:id', authService.verifyTokenMiddleware, reviewController.updateReview);

// Ruta para eliminar una reseña por su ID (protegida)
router.delete('/:id', authService.verifyTokenMiddleware, reviewController.deleteReview);

module.exports = router;
