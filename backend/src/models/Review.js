// Importamos mongoose
const mongoose = require('mongoose');

// Definimos el esquema de Review
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

// Exportamos el modelo de Review
module.exports = mongoose.model('Review', ReviewSchema);
