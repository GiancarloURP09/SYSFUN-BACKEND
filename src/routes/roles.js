const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const authMiddleware = require('../middleware/authMiddleware');
const { check } = require('express-validator');

/**
 * @swagger
 * tags:
 *   name: Rol
 *   description: Operaciones relacionadas con la gestión de roles
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Rol]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *           examples:
 *             Crear un rol:
 *               value: {
 *                 "nombre": "Administrador",
 *                 "descripcion": "Rol con permisos de administrador",
 *                 "area": "654c8c36b8975746148c8762",// ID del área
 *               }
 *     responses:
 *       201:
 *         description: Rol creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 rol:
 *                   $ref: '#/components/schemas/Rol'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error del servidor
 */
router.post('/', authMiddleware, [
  check('nombre', 'El nombre del rol es obligatorio').notEmpty(),
  check('area', 'El ID del área es obligatorio').notEmpty(),
], rolController.crearRol);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Rol]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.get('/', authMiddleware, rolController.obtenerRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Rol]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', authMiddleware, rolController.obtenerRol);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: [Rol]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *           examples:
 *             Actualizar un rol:
 *               value: {
 *                 "nombre": "Administrador Actualizado",
 *                 "descripcion": "Rol con permisos de administrador (actualizado)",
 *                 "area": "654c8c36b8975746148c8763", // ID del área
 *               }
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 rol:
 *                   $ref: '#/components/schemas/Rol'
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', authMiddleware, [
  check('nombre', 'El nombre del rol es obligatorio').notEmpty(),
  check('area', 'El ID del área es obligatorio').notEmpty(),
], rolController.actualizarRol);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: [Rol]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
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
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', authMiddleware, rolController.eliminarRol);

module.exports = router;