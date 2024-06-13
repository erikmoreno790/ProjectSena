const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authService = require('../services/authService');

// Ruta para crear una nueva categoría (pública)
router.post('/', categoryController.createCategory);

// Ruta para obtener todas las categorías (pública)
router.get('/', categoryController.getAllCategories);

// Ruta para obtener una categoría por su ID (pública)
router.get('/:id', categoryController.getCategoryById);

// Ruta para actualizar una categoría por su ID (protegida)
router.put('/:id', authService.verifyTokenMiddleware, categoryController.updateCategory);

// Ruta para eliminar una categoría por su ID (protegida)
router.delete('/:id', authService.verifyTokenMiddleware, categoryController.deleteCategory);

module.exports = router;
