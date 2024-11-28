const express = require('express');
const router = express.Router();
const empleadoControlador = require('../controladores/empleadosControlador'); // Verifica la ruta

// Rutas
router.get('/empleados', empleadoControlador.getAllEmpleado);
router.get('/empleados/:id', empleadoControlador.getEmpleadoById);
router.post('/empleados', empleadoControlador.addEmpleado);
router.put('/empleados/:id', empleadoControlador.updateEmpleado);
router.delete('/empleados/:id', empleadoControlador.deleteEmpleado);

module.exports = router;
