const express = require('express');
const router = express.Router();
const vehiculosControlador = require('../controladores/vehiculosControlador'); // Verifica la ruta

// Rutas
router.get('/vehiculos', vehiculosControlador.getAllVehicles);
router.get('/vehiculos/:id', vehiculosControlador.getVehicleById);
router.post('/vehiculos', vehiculosControlador.addVehicle);
router.put('/vehiculos/:id', vehiculosControlador.updateVehicle);
router.delete('/vehiculos/:id', vehiculosControlador.deleteVehicle);

module.exports = router;
