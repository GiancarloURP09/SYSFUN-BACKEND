const Contrato = require('../models/Contrato');

// Crear contrato
exports.crearContrato = async (req, res) => {
  try {
    const { cliente, proyecto, descripcion, monto, estado, fechaInicio, fechaFin } = req.body;

    // Validar campos requeridos
    if (!cliente || !proyecto || !descripcion || !monto || !fechaInicio || !fechaFin) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    // Procesar documentos adjuntos
    const documentos = req.files?.map((file) => ({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
    })) || [];

    // Crear contrato
    const nuevoContrato = new Contrato({
      cliente,
      proyecto,
      descripcion,
      monto,
      estado,
      fechaInicio,
      fechaFin,
      documentos,
    });

    await nuevoContrato.save();
    res.status(201).json({ mensaje: "Contrato creado correctamente.", contrato: nuevoContrato });
  } catch (error) {
    console.error("Error al crear contrato:", error);
    res.status(500).json({ mensaje: "Error al crear contrato.", error: error.message });
  }
};

// Obtener todos los contratos
exports.obtenerContratos = async (req, res) => {
  try {
    const contratos = await Contrato.find()
      .populate('cliente', 'nombre')
      .populate('proyecto', 'nombre');
    res.json(contratos);
  } catch (error) {
    console.error("Error al obtener contratos:", error);
    res.status(500).json({ mensaje: "Error al obtener contratos." });
  }
};

// Obtener contrato por ID
exports.obtenerContratoPorId = async (req, res) => {
  try {
    const contrato = await Contrato.findById(req.params.id)
      .populate('cliente', 'nombre')
      .populate('proyecto', 'nombre');
    if (!contrato) {
      return res.status(404).json({ mensaje: "Contrato no encontrado." });
    }
    res.json(contrato);
  } catch (error) {
    console.error("Error al obtener contrato:", error);
    res.status(500).json({ mensaje: "Error al obtener contrato." });
  }
};

// Actualizar contrato
exports.actualizarContrato = async (req, res) => {
  try {
    const { cliente, proyecto, descripcion, monto, estado, fechaInicio, fechaFin } = req.body;

    const documentos = req.files?.map((file) => ({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
    })) || [];

    const contratoActualizado = await Contrato.findByIdAndUpdate(
      req.params.id,
      {
        cliente,
        proyecto,
        descripcion,
        monto,
        estado,
        fechaInicio,
        fechaFin,
        documentos,
      },
      { new: true }
    );

    if (!contratoActualizado) {
      return res.status(404).json({ mensaje: "Contrato no encontrado." });
    }

    res.json({ mensaje: "Contrato actualizado correctamente.", contrato: contratoActualizado });
  } catch (error) {
    console.error("Error al actualizar contrato:", error);
    res.status(500).json({ mensaje: "Error al actualizar contrato." });
  }
};

// Eliminar contrato
exports.eliminarContrato = async (req, res) => {
  try {
    const contrato = await Contrato.findByIdAndDelete(req.params.id);
    if (!contrato) {
      return res.status(404).json({ mensaje: "Contrato no encontrado." });
    }
    res.json({ mensaje: "Contrato eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar contrato:", error);
    res.status(500).json({ mensaje: "Error al eliminar contrato." });
  }
};
