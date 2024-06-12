const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoutes = require('./src/routes/userRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const config = require('./config');
const PORT = process.env.PORT || 4000;
const app = express();

// // Puerto
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Servidor backend corriendo en el puerto ${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
})


// Configuración de MongoDB
mongoose.connect(config.mongoURI)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.log(err));


// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  const upload = multer({ storage: storage });
  
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(upload.single('profilePhoto')); // Este middleware manejará la subida de la foto de perfil

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/requests', requestRoutes);


// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});


module.exports = app;