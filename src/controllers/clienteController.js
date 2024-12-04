const mongoose = require('mongoose'); 
const Cliente = require('../models/Cliente');

exports.crearCliente = async (req, res) => {
    try {
      const {
        nombre,
        rubro,
        representante,
        tipoDocumento,
        numeroDocumento,
        usuariosAsociados,
      } = req.body;
  
      // Convertir usuariosAsociados en un array de ObjectId
      const usuariosAsociadosIds = usuariosAsociados.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
  
      // Crear un nuevo cliente con los datos proporcionados
      const nuevoCliente = new Cliente({
        nombre,
        rubro,
        representante,
        tipoDocumento,
        numeroDocumento,
        usuariosAsociados: usuariosAsociadosIds, // Asignar los ObjectId convertidos
      });
  
      await nuevoCliente.save();
  
      res.status(201).json({
        mensaje: 'Cliente creado correctamente',
        cliente: nuevoCliente,
      });
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      res.status(500).json({ mensaje: 'Error al crear el cliente' });
    }
  };
  

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().populate('usuariosAsociados', 'nombres apellidos');
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los clientes' });
  }
};

exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id).populate('usuariosAsociados', 'nombres apellidos');
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el cliente' });
  }
};

exports.actualizarCliente = async (req, res) => {
    try {
      // Convertir usuariosAsociados en un array de ObjectId correctamente
      const usuariosAsociados = req.body.usuariosAsociados.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
  
      const clienteActualizado = await Cliente.findByIdAndUpdate(
        req.params.id,
        { ...req.body, usuariosAsociados }, // Actualiza usuarios asociados con ObjectId
        { new: true }
      );
  
      if (!clienteActualizado) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
      }
      res.json({ mensaje: 'Cliente actualizado correctamente', cliente: clienteActualizado });
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
    }
  };
  

exports.eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
  }
};

exports.evaluarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const esPotencial = cliente.rubro === 'Tecnología' && cliente.usuariosAsociados.length > 1;

    cliente.esPotencial = esPotencial;
    await cliente.save();

    res.json({ mensaje: 'Evaluación completada', cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al evaluar el cliente' });
  }
};

exports.asociarUsuario = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const { usuarioId } = req.body;
    if (!cliente.usuariosAsociados.includes(usuarioId)) {
      cliente.usuariosAsociados.push(usuarioId);
      await cliente.save();
    }

    res.json({ mensaje: 'Usuario asociado correctamente', cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al asociar el usuario' });
  }
};

exports.desasociarUsuario = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const { usuarioId } = req.body;
    cliente.usuariosAsociados = cliente.usuariosAsociados.filter(
      (id) => id.toString() !== usuarioId
    );
    await cliente.save();

    res.json({ mensaje: 'Usuario desasociado correctamente', cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al desasociar el usuario' });
  }
};
