const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['admin', 'marketing', 'ventas', 'desarrollo'], 
    default: 'ventas' 
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);