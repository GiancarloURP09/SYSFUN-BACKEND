const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");

/**
 * @swagger
 * tags:
 *   name: Proyectos
 *   description: APIs para gestionar proyectos
 */

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cliente:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *               fechaFin:
 *                 type: string
 *                 format: date
 *               responsable:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proyecto creado correctamente
 *       500:
 *         description: Error al crear el proyecto
 */
router.post("/", proyectoController.crearProyecto);

router.get("/", proyectoController.obtenerProyectos);

router.get("/:id", proyectoController.obtenerProyectoPorId);

router.put("/:id", proyectoController.actualizarProyecto);

router.delete("/:id", proyectoController.eliminarProyecto);

module.exports = router;
