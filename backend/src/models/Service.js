/* Este modelo define la estructura de datos de un servicio en la 
base de datos MongoDB, incluyendo campos como título, descripción, categoría 
(plomería, albañilería, enfermería, mecánica, etc.), precio, ubicación 
(coordenadas geográficas), horario de disponibilidad, etc. */

const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  supplier: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  status: { 
    type: String, 
    enum: ['pending', 'in progress', 'completed'], 
    default: 'pending' 
  },
  date: {
    type: Date,
    default: Date.now
}
});

// To do:  Crear un índice espacial para el campo de ubicación
//          serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


