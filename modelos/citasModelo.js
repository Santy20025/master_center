const db = require('../config/db');

const getAllCita = (callback) => {
    const query = 'SELECT * FROM citas';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Obtener servicio por ID
  const getCitaById = (id, callback) => {
    const query = 'SELECT * FROM citas WHERE Id_Cita = ? ';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  };
  
  const addCita = (cita, callback) => {
    const query = `INSERT INTO citas (Vehiculo, Fecha, Hora, Empleado, Servicio, Estado) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const {Vehiculo, Fecha, Hora, Empleado, Servicio, Estado } = cita;
    db.query(query, [Vehiculo, Fecha, Hora, Empleado, Servicio, Estado], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};



  // Actualizar un vehículo
  const updateCita = (id, cita, callback) => {
    const query = `UPDATE citas 
                   SET Vehiculo = ?, Fecha = ?, Hora = ?, Empleado = ?, Servicio = ?, Estado = ?
                   WHERE Id_Cita = ?`;
    const { Vehiculo, Fecha, Hora, Empleado, Servicio, Estado } = cita;
    db.query(query, [Vehiculo, Fecha, Hora, Empleado, Servicio, Estado, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
  
  // Eliminar un vehículo
  const deleteCita = (id, callback) => {
    const query = 'DELETE FROM citas WHERE Id_Cita = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllCita,
    getCitaById,
    addCita,
    updateCita,
    deleteCita
  };