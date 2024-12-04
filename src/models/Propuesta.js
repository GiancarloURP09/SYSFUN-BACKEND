const mongoose = require("mongoose");

const PropuestaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  fechaReunion: {
    type: Date,
  },
  urlReunion: {
    type: String,
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Aprobada", "Rechazada"],
    default: "Pendiente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Propuesta", PropuestaSchema);
