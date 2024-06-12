const jwt = require('jsonwebtoken');
const config = require('../config');

// Función para generar un token JWT
exports.generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

// Función para verificar el token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

// Middleware para verificar el token en las solicitudes protegidas
exports.verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const userId = authService.verifyToken(token);

  if (!userId) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.userId = userId;
  next();
};
