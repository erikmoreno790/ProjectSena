// Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema de Category
const CategorySchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    servicios: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

// Exportamos el modelo de Category
module.exports = mongoose.model('Category', CategorySchema);
