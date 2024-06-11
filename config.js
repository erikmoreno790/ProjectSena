const crypto = require('crypto');

// Genera la clave secreta JWT
const jwtSecret = crypto.randomBytes(64).toString('hex');

module.exports = {
    jwtSecret:  jwtSecret, 
    mongoURI: 'mongodb://localhost:27017' // Reemplaza 'your_mongodb_connection_string' con tu cadena de conexión a MongoDB
  };
  