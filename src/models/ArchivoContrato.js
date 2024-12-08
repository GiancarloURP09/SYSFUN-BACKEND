const mongoose = require('mongoose');

const archivoContratoSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  contentType: {
    type: String,
  },
  data: {
    type: Buffer,
  },
  contratoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato',
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ArchivoContrato', archivoContratoSchema);
