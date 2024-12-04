const Propuesta = require("../models/Propuesta");
const Cliente = require("../models/Cliente");

// Crear una nueva propuesta
exports.crearPropuesta = async (req, res) => {
  try {
    const {
      cliente,
      descripcion,
      monto,
      fechaInicio,
      fechaFin,
      fechaReunion,
      urlReunion,
    } = req.body;

    const nuevaPropuesta = new Propuesta({
      cliente,
      descripcion,
      monto,
      fechaInicio,
      fechaFin,
      fechaReunion,
      urlReunion,
    });

    await nuevaPropuesta.save();
    res.status(201).json({ mensaje: "Propuesta creada correctamente", propuesta: nuevaPropuesta });
  } catch (error) {
    console.error("Error al crear la propuesta:", error);
    res.status(500).json({ mensaje: "Error al crear la propuesta" });
  }
};

// Obtener todas las propuestas
exports.obtenerPropuestas = async (req, res) => {
  try {
    const propuestas = await Propuesta.find()
      .populate("cliente", "nombre") // Asegúrate de que "cliente" es el nombre del campo referenciado
      .exec();
    res.status(200).json(propuestas);
  } catch (error) {
    console.error("Error al obtener propuestas:", error);
    res.status(500).json({ mensaje: "Error al obtener propuestas" });
  }
};

// Actualizar una propuesta
exports.actualizarPropuesta = async (req, res) => {
  try {
    const propuestaActualizada = await Propuesta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!propuestaActualizada) {
      return res.status(404).json({ mensaje: "Propuesta no encontrada" });
    }
    res.json({ mensaje: "Propuesta actualizada correctamente", propuesta: propuestaActualizada });
  } catch (error) {
    console.error("Error al actualizar la propuesta:", error);
    res.status(500).json({ mensaje: "Error al actualizar la propuesta" });
  }
};

// Eliminar una propuesta
exports.eliminarPropuesta = async (req, res) => {
  try {
    const propuestaEliminada = await Propuesta.findByIdAndDelete(req.params.id);
    if (!propuestaEliminada) {
      return res.status(404).json({ mensaje: "Propuesta no encontrada" });
    }
    res.json({ mensaje: "Propuesta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la propuesta:", error);
    res.status(500).json({ mensaje: "Error al eliminar la propuesta" });
  }
};
