const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: APIs para gestionar clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               rubro:
 *                 type: string
 *               representante:
 *                 type: string
 *               tipoDocumento:
 *                 type: string
 *                 enum: [DNI, RUC, Pasaporte, Carnet de Extranjería]
 *               numeroDocumento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       500:
 *         description: Error al crear el cliente
 */
router.post('/', clienteController.crearCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Error al obtener los clientes
 */
router.get('/', clienteController.obtenerClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Datos del cliente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al obtener el cliente
 */
router.get('/:id', clienteController.obtenerClientePorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               rubro:
 *                 type: string
 *               representante:
 *                 type: string
 *               tipoDocumento:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al actualizar el cliente
 */
router.put('/:id', clienteController.actualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al eliminar el cliente
 */
router.delete('/:id', clienteController.eliminarCliente);

/**
 * @swagger
 * /clientes/{id}/evaluar:
 *   post:
 *     summary: Evaluar si un cliente es potencial
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente evaluado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al evaluar el cliente
 */
router.post('/:id/evaluar', clienteController.evaluarCliente);

/**
 * @swagger
 * /clientes/{id}/asociar-usuario:
 *   post:
 *     summary: Asociar un usuario a un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario asociado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al asociar el usuario
 */
router.post('/:id/asociar-usuario', clienteController.asociarUsuario);

/**
 * @swagger
 * /clientes/{id}/desasociar-usuario:
 *   post:
 *     summary: Desasociar un usuario de un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario desasociado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error al desasociar el usuario
 */
router.post('/:id/desasociar-usuario', clienteController.desasociarUsuario);

module.exports = router;

