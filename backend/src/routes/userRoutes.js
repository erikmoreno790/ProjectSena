const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/register', userController.registerUser);

// Ruta para actualizar un usuario existente
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

// Ruta para actualizar la imagen de perfil de un usuario existente
router.put('/:id/profile-photo', userController.uploadProfilePhoto);


module.exports = router;
