const User = require('../models/User')

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res)=> {
    try {
        const users = await User.find();
        res.json(users);
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
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Controlador para crear un nuevo usuario
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phoneNumber} = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        const newUser = new User({
            name,
            email,
            password,
            phoneNumber
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        next(error);
    }
  };
 
// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar los campos del usuario si se proporcionan en la solicitud
      if (req.body.name != null) {
        user.name = req.body.name;
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.password != null) {
        user.password = req.body.password;
      }
      if (req.body.phoneNumber != null) {
        user.phoneNumber = req.body.phoneNumber;
      }
      if (req.body.userType != null) {
        user.userType = req.body.userType;
      }
      if (req.body.location != null) {
        user.location = req.body.location;
      }
      if (req.body.profilePhoto != null) {
        user.profilePhoto = req.body.profilePhoto;
      }
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.remove();
    res.json({ message: 'Usuario eliminado' });
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

