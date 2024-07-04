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
      default: 'Point',
      required: false
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      required: false,
      validate: {
        validator: function(v) {
          return Array.isArray(v) && v.length === 2;
        },
        message: props => `${props.value} debe ser un array de dos números [longitude, latitude]`
      }
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

ServiceSchema.pre('save', function(next) {
  if (!this.location || !this.location.coordinates || this.location.coordinates.length !== 2) {
    this.location = {
      type: 'Point',
      coordinates: [0, 0]
    };
  }
  next();
});

// To do:  Crear un índice espacial para el campo de ubicación
//          serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', ServiceSchema);

// Exportamos el modelo de Service
module.exports = Service;


