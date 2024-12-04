const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rubro: { type: String, required: true },
  representante: { type: String, required: true },
  tipoDocumento: {
    type: String,
    required: true,
    enum: ['DNI', 'RUC', 'Pasaporte', 'Carnet de Extranjería'],
  },
  numeroDocumento: { type: String, required: true, unique: true },
  usuariosAsociados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  esPotencial: { type: Boolean, default: false },
});

module.exports = mongoose.model('Cliente', clienteSchema);

