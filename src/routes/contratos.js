const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');
const upload = require('../middleware/upload');

// Crear contrato con documentos
router.post('/', upload.array('documentos'), contratoController.crearContrato);

// Obtener todos los contratos
router.get('/', contratoController.obtenerContratos);

// Obtener contrato por ID
router.get('/:id', contratoController.obtenerContratoPorId);

// Actualizar contrato con documentos
router.put('/:id', upload.array('documentos'), contratoController.actualizarContrato);

// Eliminar contrato
router.delete('/:id', contratoController.eliminarContrato);

module.exports = router;
