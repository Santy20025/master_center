const db = require('../config/db');

const getAllRespuesto = (callback) => {
    const query = 'SELECT * FROM repuesto';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Obtener servicio por ID
  const getRepuestoById = (id, callback) => {
    const query = 'SELECT * FROM repuesto WHERE Id_Repuesto = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results[0]);
    });
  };
  
// Agregar un nuevo servicio
const addRepuesto = (repuesto, callback) => {
    const query = `INSERT INTO repuesto (Nombre, Descripcion, Categoria, Precio, Cantidad, Ubicacion, Proveedor, Empleado, Estado) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const { Nombre, Descripcion, Categoria, Precio, Cantidad, Ubicacion, Proveedor, Empleado, Estado } = repuesto;
    db.query(query, [Nombre, Descripcion, Categoria, Precio, Cantidad, Ubicacion, Proveedor, Empleado, Estado], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};


  // Actualizar un vehículo
  const updateRepuesto = (id, repuesto, callback) => {
    const query = `UPDATE repuesto SET Nombre = ?, Descripcion = ?, Categoria = ?, Precio = ?, Cantidad = ?, Ubicacion = ?, Proveedor = ?, Empleado = ?, Estado = ?
                       WHERE Id_Repuesto = ?`;
    const { Nombre, Descripcion, Categoria, Precio, Cantidad, Ubicacion, Proveedor, Empleado, Estado } = repuesto;
    db.query(query, [Nombre, Descripcion, Categoria, Precio, Cantidad, Ubicacion, Proveedor, Empleado, Estado, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  // Eliminar un vehículo
  const deleteRepuesto = (id, callback) => {
    const query = 'DELETE FROM repuesto WHERE Id_Repuesto = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllRespuesto,
    getRepuestoById,
    addRepuesto,
    updateRepuesto,
    deleteRepuesto
  };