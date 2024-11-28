const express = require('express');
const router = express.Router();
const repuestosControlador = require('../controladores/repuestoControlador'); // Verifica la ruta

// Rutas
router.get('/repuestos', repuestosControlador.getAllRespuesto);
router.get('/repuestos/:id', repuestosControlador.getRepuestoById);
router.post('/repuestos', repuestosControlador.addRepuesto);
router.put('/repuestos/:id', repuestosControlador.updateRepuesto);
router.delete('/repuestos/:id', repuestosControlador.deleteRepuesto);

module.exports = router;
