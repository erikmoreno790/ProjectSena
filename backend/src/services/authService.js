const jwt = require('jsonwebtoken');
const config = require('../../config');

// Función para generar un token JWT
exports.generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

// Función para verificar el token JWT
exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('Decoded Token:', decoded);  // Línea de depuración
    return decoded.userId;
  } catch (error) {
    console.error('Error verifying token:', error);  // Línea de depuración
    return null;
  }
};

// Middleware para verificar el token en las solicitudes protegidas
exports.verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);  // Línea de depuración

  // Extraer el token del encabezado
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);  // Línea de depuración

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  const userId = exports.verifyToken(token);
  console.log('User ID:', userId);  // Línea de depuración

  if (!userId) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  req.userId = userId;
  next();
};

/**
 * Extrae y retorna el valor del token del encabezado de autorización
 * @param {object} req - El objeto de la solicitud
 * @returns {string|null} - El token si está presente, de lo contrario null
 */
exports.extractToken = (req) => {
  // Extraer el token del encabezado de autorización
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);  // Línea de depuración

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);  // Línea de depuración

  return token || null;
};
