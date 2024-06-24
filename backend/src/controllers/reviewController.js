// Importamos el modelo de reseña y el servicio de autenticación
const Review = require('../models/Review');
const authService = require('../services/authService');

// Controlador para crear una nueva reseña
exports.createReview = async (req, res) => {
  try {
    // Extraer el token del encabezado de autorización
    const token = authService.extractToken(req)

    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token y obtener el ID del usuario
    const userId = authService.verifyToken(token);
    if (!userId) {
      console.log('UserId:', userId);  // Línea de depuración
      return res.status(401).json({ message: 'Token inválido' });
    }

    const newReview = new Review({
      ...req.body,
      author: {
        id: userId
      }
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para obtener todas las reseñas
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('author.id').populate('service');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una reseña por su ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('author.id').populate('service');
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener reseñas por ID de servicio
exports.getReviewsByServiceId = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('author.id', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una reseña por su ID (requiere autenticación)
exports.updateReview = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    if (review.author.id.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta reseña' });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una reseña por su ID (requiere autenticación)
exports.deleteReview = async (req, res) => {
  try {
    // Verificamos el token y obtenemos el ID del usuario
    const userId = authService.verifyToken(req.headers.authorization);
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido o no proporcionado' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    if (review.author.id.toString() !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta reseña' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
