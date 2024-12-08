const Proyecto = require("../models/Proyecto");

exports.crearProyecto = async (req, res) => {
  try {
    const { nombre, cliente, descripcion, fechaInicio, fechaFin, responsable } = req.body;

    const nuevoProyecto = new Proyecto({
      nombre,
      cliente,
      descripcion,
      fechaInicio,
      fechaFin,
      responsable,
    });

    await nuevoProyecto.save();
    res.status(201).json({ mensaje: "Proyecto creado correctamente", proyecto: nuevoProyecto });
  } catch (error) {
    console.error("Error al crear proyecto:", error);
    res.status(500).json({ mensaje: "Error al crear proyecto", error });
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find().populate("cliente", "nombre").populate("responsable", "nombres apellidos");
    res.json(proyectos);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ mensaje: "Error al obtener proyectos", error });
  }
};

exports.obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id).populate("cliente", "nombre").populate("responsable", "nombres apellidos");
    if (!proyecto) {
      return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    }
    res.json(proyecto);
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).json({ mensaje: "Error al obtener el proyecto", error });
  }
};

exports.actualizarProyecto = async (req, res) => {
  try {
    const proyectoActualizado = await Proyecto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!proyectoActualizado) {
      return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    }
    res.json({ mensaje: "Proyecto actualizado correctamente", proyecto: proyectoActualizado });
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).json({ mensaje: "Error al actualizar el proyecto", error });
  }
};

exports.eliminarProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    }
    res.json({ mensaje: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).json({ mensaje: "Error al eliminar el proyecto", error });
  }
};
