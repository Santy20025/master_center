const express = require('express');
const router = express.Router();
const citaControlador = require('../controladores/citasControlador'); // Verifica la ruta

// Rutas
router.get('/citas', citaControlador.getAllCita);
router.get('/citas/:id', citaControlador.getCitaById);
router.post('/citas', citaControlador.addCita);
router.put('/citas/:id', citaControlador.updateCita);
router.delete('/citas/:id', citaControlador.deleteCita);

module.exports = router;
