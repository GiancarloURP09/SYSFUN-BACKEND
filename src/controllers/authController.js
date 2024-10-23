const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

// Conexión a GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('archivos');
});

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  try {
    // Acceder a los campos del formulario
    const { nombres, apellidos, correo, nombre_usuario, contrasena, fecha_de_nacimiento, rol, tipoDocumento, numeroDocumento } = req.body;

    // Validar los datos del formulario
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const salt = await bcryptjs.genSalt(10);
    const contrasenaEncriptada = await bcryptjs.hash(contrasena, salt);

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      correo,
      nombre_usuario,
      contrasena: contrasenaEncriptada,
      fecha_de_nacimiento,
      rol: req.body.rol, 
      tipoDocumento,
      numeroDocumento,
    });

    await nuevoUsuario.save(); // Guardar el usuario primero

    // Guardar la imagen en GridFS después de guardar el usuario
    if (req.file) {
      const nuevoArchivo = new Archivo({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        length: req.file.size,
        chunkSize: req.file.chunkSize,
        uploadDate: new Date(),
        md5: req.file.md5,
        data: req.file.buffer,
      });
      await nuevoArchivo.save();
      nuevoUsuario.foto_de_colaborador = nuevoArchivo._id;
      await nuevoUsuario.save(); // Actualizar el usuario con el ID del archivo
    }

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};
// ... otras importaciones

// ... (código de las funciones registrarUsuario e iniciarSesion)

// Obtener un usuario por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, correo, nombre_usuario, fecha_de_nacimiento, rol, tipoDocumento, numeroDocumento } = req.body;

    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    usuario.nombres = nombres;
    usuario.apellidos = apellidos;
    usuario.correo = correo;
    usuario.nombre_usuario = nombre_usuario;
    usuario.fecha_de_nacimiento = fecha_de_nacimiento;
    usuario.rol = rol;
    usuario.tipoDocumento = tipoDocumento;
    usuario.numeroDocumento = numeroDocumento;

    await usuario.save();
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.remove();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
};
// Inicio de sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const contrasenaValida = await bcryptjs.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    console.log(token)
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('rol', 'nombre descripcion');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
  }
};