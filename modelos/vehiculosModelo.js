const db = require('../config/db');

const getAllVehicles = (callback) => {
    const query = 'SELECT * FROM vehiculo';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Obtener vehículo por ID
  const getVehicleById = (id, callback) => {
    const query = 'SELECT * FROM vehiculo WHERE Id_Vehiculo = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  };
  
  // Agregar un nuevo vehículo
  const addVehicle = (vehicle, callback) => {
    const query = `INSERT INTO vehiculo (Placa, Cliente, Marca, Modelo, Año, VIN) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const { Placa, Cliente, Marca, Modelo, Año, VIN } = vehicle;
    db.query(query, [Placa, Cliente, Marca, Modelo, Año, VIN], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Actualizar un vehículo
  const updateVehicle = (id, vehicle, callback) => {
    const query = `UPDATE vehiculo SET Placa = ?, Cliente = ?, Marca = ?, Modelo = ?, Año = ?, VIN = ? 
                   WHERE Id_Vehiculo = ?`;
    const { Placa, Cliente, Marca, Modelo, Año, VIN } = vehicle;
    db.query(query, [Placa, Cliente, Marca, Modelo, Año, VIN, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Eliminar un vehículo
  const deleteVehicle = (id, callback) => {
    const query = 'DELETE FROM vehiculo WHERE Id_Vehiculo = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllVehicles,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle
  };