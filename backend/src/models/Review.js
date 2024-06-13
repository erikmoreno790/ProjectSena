// Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema de Review
const ReviewSchema = new Schema({
  author: {
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
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

// Middleware para llenar automáticamente el nombre del autor
ReviewSchema.pre('save', async function(next) {
  if (this.isModified('author.id') || this.isNew) {
    try {
      const User = mongoose.model('User'); // Importamos el modelo User
      const user = await User.findById(this.author.id);
      if (user) {
        this.author.name = user.name;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});


// Exportamos el modelo de Review
module.exports = mongoose.model('Review', ReviewSchema);
