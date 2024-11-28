const express = require('express');
const router = express.Router();
const clienteControlador = require('../controladores/clienteControlador'); // Verifica la ruta

// Rutas
router.get('/cliente', clienteControlador.getAllcliente);
router.get('/cliente/:id', clienteControlador.getClienteById);
router.post('/cliente', clienteControlador.addCliente);
router.put('/cliente/:id', clienteControlador.updateCliente);
router.delete('/cliente/:id', clienteControlador.deleteCliente);

module.exports = router;
