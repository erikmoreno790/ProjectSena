// Importamos mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Definimos el esquema Service
const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Referencia al modelo Category
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

const Service = mongoose.model('Service', ServiceSchema);

// Exportamos el modelo de Service
module.exports = Service;


