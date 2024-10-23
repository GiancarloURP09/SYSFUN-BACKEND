const Rol = require('../models/Rol');
const Area = require('../models/Area'); // Importar el modelo Area
const { validationResult } = require('express-validator');

// Crear un rol
exports.crearRol = async (req, res) => {
  // Validar los datos del formulario
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const { nombre, descripcion, area } = req.body;

    // Verificar si el área existe
    const areaExiste = await Area.findById(area);
    if (!areaExiste) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }

    const nuevoRol = new Rol({
      nombre,
      descripcion,
      area,
    });

    await nuevoRol.save();
    // Populate permite acceder a los datos de un documento de otra coleccion
    await nuevoRol.populate('area', 'nombre descripcion');

    res.status(201).json({ mensaje: 'Rol creado correctamente', rol: nuevoRol });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Error de validación', errores: error.errors });
    }
    res.status(500).json({ mensaje: 'Error al crear el rol', error: error.message });
  }
};

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.find().populate('area', 'nombre descripcion'); // Popular el campo area con el nombre y la descripción del área
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los roles', error: error.message });
  }
};

// Obtener un rol por ID
exports.obtenerRol = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id).populate('area', 'nombre descripcion');
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
    res.json(rol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el rol', error: error.message });
  }
};

// Actualizar un rol por ID
exports.actualizarRol = async (req, res) => {
  // Validar los datos del formulario
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const { nombre, descripcion, area } = req.body;

    // Verificar si el área existe
    const areaExiste = await Area.findById(area);
    if (!area) {
      return res.status(404).json({ mensaje: 'Área no encontrada' });
    }

    const rol = await Rol.findByIdAndUpdate(req.params.id, { nombre, descripcion, area }, { new: true });
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
    res.json({ mensaje: 'Rol actualizado correctamente', rol: rol });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Error de validación', errores: error.errors });
    }
    res.status(500).json({ mensaje: 'Error al actualizar el rol', error: error.message });
  }
};

// Eliminar un rol por ID
exports.eliminarRol = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndDelete(req.params.id);
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el rol', error: error.message });
  }
};