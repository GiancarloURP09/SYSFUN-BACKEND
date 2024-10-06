const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
 *                 description: Nombres del usuario.
 *               apellidos:
 *                 type: string
 *                 description: Apellidos del usuario.
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario. Debe ser único.
 *               nombre_usuario:
 *                 type: string
 *                 description: Nombre de usuario. Debe ser único.
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario. Debe tener al menos 6 caracteres.
 *               fecha_de_nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario (opcional).
 *               foto_de_colaborador:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil del usuario (opcional).
 *               rol:
 *                 type: string
 *                 enum: [admin, marketing, ventas, desarrollo]
 *                 description: Rol del usuario.
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error de validación o error al registrar usuario
 *       500:
 *         description: Error del servidor
 */
router.post('/registro', 
  upload.single('foto_de_colaborador'),
  [
    check('nombres', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'El apellido es obligatorio').notEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('nombre_usuario', 'El nombre de usuario es obligatorio').notEmpty(),
    check('contrasena', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('fecha_de_nacimiento').optional().isDate(),
    check('rol', 'El rol debe ser uno de los siguientes: admin, marketing, ventas, desarrollo').isIn(['admin', 'marketing', 'ventas', 'desarrollo']),
  ],
  authController.registrarUsuario
);

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
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario.
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
 *         description: Credenciales inválidas o error de validación
 *       500:
 *         description: Error del servidor
 */
router.post('/login', 
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasena', 'La contraseña es obligatoria').notEmpty(),
  ],
  authController.iniciarSesion
);

module.exports = router;