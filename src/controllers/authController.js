const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena, rol } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const contrasenaEncriptada = await bcryptjs.hash(contrasena, salt);
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contrasena: contrasenaEncriptada,
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