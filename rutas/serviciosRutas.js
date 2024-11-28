const express = require('express');
const router = express.Router();
const serviciosControlador = require('../controladores/serviciosControlador'); // Verifica la ruta

// Rutas
router.get('/servicios', serviciosControlador.getAllServicio);
router.get('/servicios/:id', serviciosControlador.getServicioById);
router.post('/servicios', serviciosControlador.addServicio);
router.put('/servicios/:id', serviciosControlador.updateServicio);
router.delete('/servicios/:id', serviciosControlador.deleteServicio);

module.exports = router;
