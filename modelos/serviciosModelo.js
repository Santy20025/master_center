const db = require('../config/db');

const getAllServicio = (callback) => {
    const query = 'SELECT * FROM servicio';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Obtener servicio por ID
  const getServicioById = (id, callback) => {
    const query = 'SELECT * FROM servicio WHERE Id_Servicio = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  };
  
// Agregar un nuevo servicio
const addServicio = (servicio, callback) => {
    const query = `INSERT INTO servicio (Nombre, Descripcion, Precio, Estado) 
                   VALUES (?, ?, ?, ?)`;
    const { Nombre, Descripcion, Precio, Estado } = servicio;
    db.query(query, [Nombre, Descripcion, Precio, Estado], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};


  // Actualizar un vehículo
  const updateServicio = (id, servicio, callback) => {
    const query = `UPDATE servicio SET Nombre = ?, Descripcion = ?, Precio = ?, Estado = ?
                       WHERE Id_Servicio = ?`;
    const { Nombre, Descripcion, Precio, Estado } = servicio;
    db.query(query, [Nombre, Descripcion, Precio, Estado, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Eliminar un vehículo
  const deleteServicio = (id, callback) => {
    const query = 'DELETE FROM servicio WHERE Id_Servicio = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllServicio,
    getServicioById,
    addServicio,
    updateServicio,
    deleteServicio
  };