const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Almacenar la imagen en memoria
/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               nombre_usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               fecha_de_nacimiento:
 *                 type: string
 *                 format: date
 *               foto_de_colaborador:
 *                 type: string
 *                 format: binary
 *               rol:
 *                 type: string
 *                 enum: [admin, marketing, ventas, desarrollo]
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       500:
 *         description: Error al registrar usuario
 */
router.post('/registro', upload.single('foto_de_colaborador'), authController.registrarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/login', authController.iniciarSesion);

module.exports = router;