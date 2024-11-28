const db = require('../config/db');

const getAllEmpleado = (callback) => {
    const query = 'SELECT * FROM clientes WHERE IdUsuarioFK = 2';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
 // Obtener servicio por ID
const getEmpleadoById = (id, callback) => {
  const query = 'SELECT * FROM clientes WHERE Id_Cliente = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results[0]);
  });
};

  
  const addEmpleado = (empleado, callback) => {
    const query = `INSERT INTO clientes (nombres, correo, contrasena, direccion, celular, fechaRegistro, IdUsuarioFK) 
                   VALUES (?, ?, ?, ?, ?, NOW(), 2)`;
    const { nombres, correo, contrasena, direccion, celular } = empleado;
    db.query(query, [nombres, correo, contrasena, direccion, celular], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};



  // Actualizar un vehículo
  const updateEmpleado = (id, empleado, callback) => {
    const query = `UPDATE clientes 
                   SET nombres = ?, correo = ?, contrasena = ?, direccion = ?, celular = ? 
                   WHERE Id_Cliente = ?`;
    const { nombres, correo, contrasena, direccion, celular } = empleado;
    db.query(query, [nombres, correo, contrasena, direccion, celular, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
  
  // Eliminar un vehículo
  const deleteEmpleado = (id, callback) => {
    const query = 'DELETE FROM clientes WHERE Id_Cliente = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllEmpleado,
    getEmpleadoById,
    addEmpleado,
    updateEmpleado,
    deleteEmpleado
  };