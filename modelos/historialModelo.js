const db = require('../config/db');

const getAllHistorial = (callback) => {
    const query = 'SELECT * FROM historial_reparaciones';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Obtener servicio por ID
  const getHistorialById = (id, callback) => {
    const query = 'SELECT * FROM historial_reparaciones WHERE id_Reparacion = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  };
  
// Agregar un nuevo servicio
const addHistorial = (historial, callback) => {
    const query = `INSERT INTO historial_reparaciones (Vehiculo, Servicio, Fecha, Descripcion, Costo) 
                   VALUES (?, ?, ?, ?, ?)`;
    const { Vehiculo, Servicio, Fecha, Descripcion, Costo } = historial;
    db.query(query, [Vehiculo, Servicio, Fecha, Descripcion, Costo], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};


 const updateHistorial = (id, historial, callback) => {
  const { Vehiculo, Servicio, Fecha, Descripcion, Costo } = historial;

  // Verificar que el vehículo existe en la tabla 'vehiculo'
  const checkVehiculoExistsQuery = `SELECT COUNT(*) AS count FROM vehiculo WHERE Placa = ?`;

  db.query(checkVehiculoExistsQuery, [Vehiculo], (err, results) => {
    if (err) {
      return callback(err, null);
    }

    if (results[0].count === 0) {
      return callback(new Error('El vehículo no existe en la base de datos'), null);
    }

    // Si el vehículo existe, realizar la actualización del historial
    const updateQuery = `UPDATE historial_reparaciones SET Vehiculo = ?, Servicio = ?, Fecha = ?, Descripcion = ?, Costo = ? WHERE id_Reparacion = ?`;

    db.query(updateQuery, [Vehiculo, Servicio, Fecha, Descripcion, Costo, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  });
};

  
  // Eliminar un vehículo
  const deleteHistorial = (id, callback) => {
    const query = 'DELETE FROM historial_reparaciones WHERE id_Reparacion = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllHistorial,
    getHistorialById,
    addHistorial,
    updateHistorial,
    deleteHistorial
  };