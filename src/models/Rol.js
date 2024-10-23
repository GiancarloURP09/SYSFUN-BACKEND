const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
  permisos: [{ type: String }], // Array de permisos (opcional)
});

module.exports = mongoose.model('Rol', rolSchema);