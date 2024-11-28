const db = require('../config/db');

const getAllCliente = (callback) => {
    const query = 'SELECT * FROM clientes WHERE IdUsuarioFK = 3';
    db.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
 // Obtener servicio por ID
const getClienteById = (id, callback) => {
  const query = 'SELECT * FROM clientes WHERE Id_Cliente = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results[0]);
  });
};

  
  const addCliente = (cliente, callback) => {
    const query = `INSERT INTO clientes (nombres, correo, contrasena, direccion, celular, fechaRegistro, IdUsuarioFK) 
                   VALUES (?, ?, ?, ?, ?, NOW(), 3)`;
    const { nombres, correo, contrasena, direccion, celular } = cliente;
    db.query(query, [nombres, correo, contrasena, direccion, celular], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};



  // Actualizar un vehículo
  const updateCliente = (id, cliente, callback) => {
    const query = `UPDATE clientes 
                   SET nombres = ?, correo = ?, contrasena = ?, direccion = ?, celular = ? 
                   WHERE id = ?`;
    const { nombres, correo, contrasena, direccion, celular } = cliente;
    db.query(query, [nombres, correo, contrasena, direccion, celular, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
};
  
  // Eliminar un vehículo
  const deleteCliente = (id, callback) => {
    const query = 'DELETE FROM clientes WHERE Id_Cliente = ?';
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  };
  
  module.exports = {
    getAllCliente,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
  };