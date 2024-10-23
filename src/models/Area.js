const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
});

module.exports = mongoose.model('Area', areaSchema);