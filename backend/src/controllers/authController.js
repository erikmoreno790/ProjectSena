const bcrypt = require('bcrypt');
const User = require('../models/User');
const authService = require('../services/authService');

//Funcion para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password, userType, location, phoneNumber } = req.body;

    // Verificar que el email no esté en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      location,
      phoneNumber
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar un token JWT
    const token = authService.generateToken(newUser._id);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Funcion para iniciar sesión proporcionando email y contraseña.
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar el usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
      }
  
      // Comparar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email o contraseña incorrectos' });
      }
  
      // Generar un token JWT
      const token = authService.generateToken(user._id);
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
