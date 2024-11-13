const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true, unique: true }, 
  nombre_usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  fecha_de_nacimiento: { type: Date },
  foto_de_colaborador: { type: mongoose.Schema.Types.ObjectId, ref: 'Archivo' },
  rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true }, // Cambiar a ObjectId y referencia a Rol
  tipoDocumento: {
    type: String,
    enum: ['DNI', 'Pasaporte', 'Carnet de Extranjería', 'Otro'],
    required: true
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true
  },
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.model('Usuario', usuarioSchema);