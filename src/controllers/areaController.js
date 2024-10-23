const Area = require('../models/Area');
const { validationResult } = require('express-validator');

// Crear un área
exports.crearArea = async (req, res) => {
  // Validar los datos del formulario
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const nuevaArea = new Area(req.body);
    await nuevaArea.save();
    res.status(201).json({ mensaje: 'Área creada correctamente', area: nuevaArea });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Error de validación', errores: error.errors });
    }
    res.status(500).json({ mensaje: 'Error al crear el área', error: error.message });
  }
};

// Obtener todas las áreas
exports.obtenerAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las áreas', error: error.message });
  }
};

// Obtener un área por ID
exports.obtenerArea = async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el área', error: error.message });
  }
};

// Actualizar un área por ID
exports.actualizarArea = async (req, res) => {
  // Validar los datos del formulario
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const area = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!area) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }
    res.json({ mensaje: 'Área actualizada correctamente', area: area });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Error de validación', errores: error.errors });
    }
    res.status(500).json({ mensaje: 'Error al actualizar el área', error: error.message });
  }
};

// Eliminar un área por ID
exports.eliminarArea = async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id);
    if (!area) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }
    res.json({ mensaje: 'Área eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el área', error: error.message });
  }
};