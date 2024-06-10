/* Este modelo define la estructura de datos de una reseña o
 calificación de un servicio en la base de datos MongoDB, incluyendo 
 campos como el texto de la reseña, la calificación numérica, el ID del 
 usuario que dejó la reseña, el ID del servicio al que se refiere la reseña, etc.*/

 const mongoose = require('mongoose');

// Definimos el esquema de Reseña (ReviewSchema)
const ReviewSchema = new mongoose.Schema({
  author: {
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
