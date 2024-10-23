const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Area
 *   description: Operaciones relacionadas con la gestión de áreas
 * /areas:
 *   post:
 *     summary: Crear un área
 *     tags: [Area]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *           examples:
 *             Crear un área:
 *               value: {
 *                 "nombre": "Ventas",
 *                 "descripcion": "Área encargada de las ventas"
 *               }
 *     responses:
 *       201:
 *         description: Área creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 area:
 *                   $ref: '#/components/schemas/Area'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, [
  check('nombre', 'El nombre del área es obligatorio').notEmpty(),
], areaController.crearArea);

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: Obtener todas las áreas
 *     tags: [Area]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Area'
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.get('/', authMiddleware, areaController.obtenerAreas);

/**
 * @swagger
 * /areas/{id}:
 *   get:
 *     summary: Obtener un área por ID
 *     tags: [Area]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', authMiddleware, areaController.obtenerArea);

/**
 * @swagger
 * /areas/{id}:
 *   put:
 *     summary: Actualizar un área por ID
 *     tags: [Area]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del área
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Área actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 area:
 *                   $ref: '#/components/schemas/Area'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authMiddleware, areaController.actualizarArea);

/**
 * @swagger
 * /areas/{id}:
 *   delete:
 *     summary: Eliminar un área por ID
 *     tags: [Area]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del área
 *     responses:
 *       200:
 *         description: Área eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authMiddleware, areaController.eliminarArea);

module.exports = router;