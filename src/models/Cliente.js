const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  rubro: {
    type: String,
    required: true,
  },
  representante: {
    type: String,
    required: true,
  },
  tipoDocumento: {
    type: String,
    enum: ['DNI', 'RUC', 'Pasaporte', 'Carnet de Extranjería'],
    required: true,
  },
  numeroDocumento: {
    type: String,
    required: true,
    unique: true,
  },
  usuariosAsociados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }],
  esPotencial: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
