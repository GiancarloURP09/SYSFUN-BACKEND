const mongoose = require("mongoose");

const ProyectoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del proyecto es obligatorio"],
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: [true, "El cliente es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  estado: {
    type: String,
    enum: ["En progreso", "Completado", "Cancelado"],
    default: "En progreso",
  },
  fechaInicio: {
    type: Date,
    required: [true, "La fecha de inicio es obligatoria"],
  },
  fechaFin: {
    type: Date,
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
