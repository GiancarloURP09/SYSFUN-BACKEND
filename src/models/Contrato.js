const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  proyecto: { type: mongoose.Schema.Types.ObjectId, ref: "Proyecto", required: true },
  descripcion: { type: String, required: true },
  monto: { type: Number, required: true },
  estado: { type: String, default: "Activo" },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  documentos: [
    {
      filename: { type: String },
      contentType: { type: String },
      data: { type: Buffer },
    },
  ],
});

module.exports = mongoose.model('Contrato', contratoSchema);
