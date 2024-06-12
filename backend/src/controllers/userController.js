const User = require('../models/User')

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un usuario por su ID (requiere autenticación)
exports.updateUser = async (req, res) => {
  try {
      // Verificamos el token y obtenemos el ID del usuario
      const userId = authService.verifyToken(req.headers.authorization);
      if (!userId) {
          return res.status(401).json({ message: 'Token inválido o no proporcionado' });
      }

      if (req.params.id !== userId) {
          return res.status(403).json({ message: 'No tienes permiso para actualizar este usuario' });
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un usuario por su ID (requiere autenticación)
exports.deleteUser = async (req, res) => {
  try {
      // Verificamos el token y obtenemos el ID del usuario
      const userId = authService.verifyToken(req.headers.authorization);
      if (!userId) {
          return res.status(401).json({ message: 'Token inválido o no proporcionado' });
      }

      if (req.params.id !== userId) {
          return res.status(403).json({ message: 'No tienes permiso para eliminar este usuario' });
      }

      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar la imagen de perfil de un usuario
exports.uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el ID del usuario de la solicitud
    const file = req.file; // Obtener la información del archivo subido

    // Validar que se proporcionó el ID del usuario y se subió un archivo
    if (!userId || !file) {
      return res.status(400).json({ message: 'Debe proporcionar un ID de usuario y una imagen.' });
    }

    // Actualizar la URL de la foto de perfil del usuario en la base de datos
    await User.findByIdAndUpdate(userId, { profilePhoto: file.path });

    res.status(200).json({ message: 'Foto de perfil subida exitosamente.' });
  } catch (error) {
    console.error('Error al subir la foto de perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

