const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const authMiddleware = require('../middleware/authMiddleware');
const Usuario = require('../models/Usuario'); // Importar el modelo de usuario
const Archivo = require('../models/Archivo');

/**
 * @swagger
 * /auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuario]
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
 *               tipoDocumento:
 *                 type: string
 *                 enum: [DNI, Pasaporte, Carnet de Extranjería, Otro]
 *                 description: Tipo de documento del usuario.
 *               numeroDocumento:
 *                 type: string
 *                 description: Número de documento del usuario. Debe ser único.
 *               rol: 
 *                 type: string
 *                 description: ID del rol del usuario.
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
    check('tipoDocumento', 'El tipo de documento es obligatorio').notEmpty(),
    check('numeroDocumento', 'El número de documento es obligatorio').notEmpty(),  
  ],
  authController.registrarUsuario
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuario]
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

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener los datos del usuario logueado
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       401:
 *         description: Acceso denegado
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contrasena');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los datos del usuario' });
  }
});

/**
 * @swagger
 * /auth/imagen/{usuarioId}:
 *   get:
 *     summary: Obtener la imagen de perfil de un usuario
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Imagen de perfil del usuario
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario o imagen no encontrada
 */
router.get('/imagen/:usuarioId', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    if (!usuario.foto_de_colaborador) {
      return res.status(404).json({ mensaje: 'Imagen no encontrada' });
    }

    const archivo = await Archivo.findById(usuario.foto_de_colaborador);
    if (!archivo) {
      return res.status(404).json({ mensaje: 'Archivo no encontrado' });
    }

    res.set('Content-Type', archivo.contentType);
    res.send(archivo.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la imagen del usuario' });
  }
});
// ... otras importaciones

// ... (código de las rutas /registro, /login, /me e /imagen)

/**
 * @swagger
 * /auth/usuario/{id}:
 *   get:
 *     summary: Obtener los datos de un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/usuario/:id', authMiddleware, authController.obtenerUsuario);

/**
 * @swagger
 * /auth/usuario/{id}:
 *   put:
 *     summary: Actualizar los datos de un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *                 description: Correo electrónico del usuario.
 *               nombre_usuario:
 *                 type: string
 *                 description: Nombre de usuario.
 *               fecha_de_nacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario.
 *               rol:
 *                 type: string
 *                 enum: [admin, marketing, ventas, desarrollo]
 *                 description: Rol del usuario.
 *               tipoDocumento:
 *                 type: string
 *                 enum: [DNI, Pasaporte, Carnet de Extranjería, Otro]
 *                 description: Tipo de documento del usuario.
 *               numeroDocumento:
 *                 type: string
 *                 description: Número de documento del usuario.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/usuario/:id', authMiddleware, authController.actualizarUsuario);
/**
 * @swagger
 * /auth/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Usuario'  

 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error del servidor
 */
router.get('/usuarios', authMiddleware, authController.obtenerUsuarios);
/**
 * @swagger
 * /auth/usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/usuario/:id', authMiddleware, authController.eliminarUsuario);


/**
 * @swagger
 * /auth/solicitar-restablecimiento:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags: [Usuario]
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
 *     responses:
 *       200:
 *         description: Correo de restablecimiento enviado
 *       404:
 *         description: Correo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/solicitar-restablecimiento', authController.solicitarRestablecimientoContrasena);

/**
 * @swagger
 * /auth/restablecer-contrasena/{token}:
 *   post:
 *     summary: Restablecer la contraseña
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de restablecimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevaContrasena:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *     responses:
 *       200:
 *         description: Contraseña restablecida correctamente
 *       400:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error del servidor
 */
router.post('/restablecer-contrasena/:token', authController.restablecerContrasena);

module.exports = router;


module.exports = router;