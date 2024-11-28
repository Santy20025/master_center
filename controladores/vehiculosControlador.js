const vehiculosModelo = require('../modelos/vehiculosModelo');

const getAllVehicles = (req, res) => {
    vehiculosModelo.getAllVehicles((error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener los vehículos', error });
        }
        res.json(results);
    });
};

const getVehicleById = (req, res) => {
    const id = req.params.id;
    vehiculosModelo.getVehicleById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el vehículo', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(result);
    });
};

// Controlador para agregar un vehículo
const addVehicle = (req, res) => {
    const { Placa, Cliente, Marca, Modelo, Año, VIN } = req.body;

    // Validar los datos del vehículo (ejemplo básico)
    if (!Placa || !Cliente || !Marca || !Modelo || !Año || !VIN) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos obligatorios.' });
    }

    // Crear el objeto vehículo
    const newVehicle = {
        Placa,
        Cliente,
        Marca,
        Modelo,
        Año,
        VIN
    };

    // Llamar al modelo para agregar el vehículo
    vehiculosModelo.addVehicle(newVehicle, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar el vehículo', detalles: error.message });
        }
        res.status(201).json({ message: 'Vehículo agregado exitosamente', vehiculoId: results.insertId });
    });
};     

const updateVehicle = (req, res) => {
    const id = req.params.id;
    const vehicle = req.body;
    vehiculosModelo.updateVehicle(id, vehicle, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el vehículo', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente', result });
    });
};

const deleteVehicle = (req, res) => {
    const id = req.params.id;
    vehiculosModelo.deleteVehicle(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al eliminar el vehículo', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json({ message: 'Vehículo eliminado correctamente', result });
    });
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
};
