const express = require('express');
const router = express.Router();
const historialControlador = require('../controladores/historial'); // Verifica la ruta

// Rutas
router.get('/historial', historialControlador.getAllHistorial);
router.get('/historial/:id', historialControlador.getHistorialById);
router.post('/historial', historialControlador.addHistorial);
router.put('/historial/:id', historialControlador.updateHistorial);
router.delete('/historial/:id', historialControlador.deleteHistorial);

module.exports = router;
