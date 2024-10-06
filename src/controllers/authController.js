const Usuario = require('../models/Usuario');
const Archivo = require('../models/Archivo');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

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
    const { nombres, apellidos, correo, nombre_usuario, contrasena, fecha_de_nacimiento, rol } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const contrasenaEncriptada = await bcryptjs.hash(contrasena, salt);

    // Guardar la imagen en GridFS
    let archivoId = null;
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
      archivoId = nuevoArchivo._id;
    }

    const nuevoUsuario = new Usuario({
      nombres,
      apellidos,
      correo,
      nombre_usuario,
      contrasena: contrasenaEncriptada,
      fecha_de_nacimiento,
      foto_de_colaborador: archivoId,
      rol,
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Inicio de sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const contrasenaValida = await bcryptjs.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};