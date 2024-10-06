const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  nombre_usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  fecha_de_nacimiento: { type: Date },
  foto_de_colaborador: { type: mongoose.Schema.Types.ObjectId, ref: 'Archivo' }, // Referencia a GridFS
  rol: {
    type: String,
    enum: ['admin', 'marketing', 'ventas', 'desarrollo'],
    default: 'ventas'
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);