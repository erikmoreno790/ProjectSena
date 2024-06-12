const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un nuevo usuario (pública)
router.post('/', userController.createUser);

// Ruta para obtener todos los usuarios (pública)
router.get('/', userController.getAllUsers);

// Ruta para obtener un usuario por su ID (pública)
router.get('/:id', userController.getUserById);

// Ruta para actualizar un usuario por su ID (protegida)
router.put('/:id', authService.verifyTokenMiddleware, userController.updateUser);

// Ruta para eliminar un usuario por su ID (protegida)
router.delete('/:id', authService.verifyTokenMiddleware, userController.deleteUser);


module.exports = router;
