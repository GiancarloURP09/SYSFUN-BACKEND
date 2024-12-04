const express = require("express");
const router = express.Router();
const propuestaController = require("../controllers/propuestaController");

/**
 * @swagger
 * tags:
 *   name: Propuestas
 *   description: APIs para gestionar propuestas comerciales
 */

/**
 * @swagger
 * /propuestas:
 *   post:
 *     summary: Crear una nueva propuesta
 *     tags: [Propuestas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *                 description: ID del cliente asociado
 *               descripcion:
 *                 type: string
 *               monto:
 *                 type: number
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               fechaReunion:
 *                 type: string
 *                 format: date
 *               urlReunion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Propuesta creada correctamente
 *       500:
 *         description: Error al crear la propuesta
 */
router.post("/", propuestaController.crearPropuesta);

/**
 * @swagger
 * /propuestas:
 *   get:
 *     summary: Obtener todas las propuestas
 *     tags: [Propuestas]
 *     responses:
 *       200:
 *         description: Lista de propuestas
 *       500:
 *         description: Error al obtener propuestas
 */
router.get("/", propuestaController.obtenerPropuestas);

/**
 * @swagger
 * /propuestas/{id}:
 *   put:
 *     summary: Actualizar una propuesta
 *     tags: [Propuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               monto:
 *                 type: number
 *               fechaReunion:
 *                 type: string
 *                 format: date
 *               urlReunion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Propuesta actualizada correctamente
 *       404:
 *         description: Propuesta no encontrada
 *       500:
 *         description: Error al actualizar la propuesta
 */
router.put("/:id", propuestaController.actualizarPropuesta);

/**
 * @swagger
 * /propuestas/{id}:
 *   delete:
 *     summary: Eliminar una propuesta
 *     tags: [Propuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la propuesta
 *     responses:
 *       200:
 *         description: Propuesta eliminada correctamente
 *       404:
 *         description: Propuesta no encontrada
 *       500:
 *         description: Error al eliminar la propuesta
 */
router.delete("/:id", propuestaController.eliminarPropuesta);

module.exports = router;
