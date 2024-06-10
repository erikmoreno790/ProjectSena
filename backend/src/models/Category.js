// Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema de Categoría (CategorySchema)
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
        ref: 'Servicio'
    }]
});

// Exportamos el modelo de Categoría
module.exports = mongoose.model('Category', CategorySchema);
