const conexion = require('../config/db');

const clientesModelo = {
    // Buscar cliente por correo
    buscarPorCorreo: async (correo) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM clientes WHERE correo = ?';
            conexion.query(query, [correo], (err, resultados) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultados[0]); // Devuelve el primer cliente encontrado o undefined
            });
        });
    },

    // Registrar nuevo cliente
    registrarCliente: async (clienteData) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO clientes (
                    nombres, 
                    correo, 
                    celular, 
                    direccion, 
                    contrasena, 
                    fechaRegistro, 
                    IdUsuarioFK
                ) VALUES (?, ?, ?, ?, ?, NOW(), 3)`;
            
            const valores = [
                clienteData.nombres,
                clienteData.correo,
                clienteData.celular,
                clienteData.direccion,
                clienteData.contrasena
            ];

            conexion.query(query, valores, (err, resultado) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultado);
            });
        });
    },

    // Obtener todos los clientes
    obtenerTodos: async () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT c.*, u.nombre as nombre_usuario 
                FROM clientes c 
                LEFT JOIN usuarios u ON c.IdUsuariosFK = u.id 
                ORDER BY c.nombres`;
            conexion.query(query, (err, resultados) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultados);
            });
        });
    },

    // Obtener cliente por ID
    obtenerPorId: async (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT c.*, u.nombre as nombre_usuario 
                FROM clientes c 
                LEFT JOIN usuarios u ON c.IdUsuariosFK = u.id 
                WHERE c.id = ?`;
            conexion.query(query, [id], (err, resultados) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultados[0]); // Devuelve el cliente encontrado o undefined
            });
        });
    },

    // Actualizar cliente
    actualizar: async (id, clienteData) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE clientes 
                SET nombres = ?, 
                    correo = ?, 
                    celular = ?, 
                    direccion = ?,
                    fecha_actualizacion = NOW()
                WHERE id = ?`;
            
            const valores = [
                clienteData.nombres,
                clienteData.correo,
                clienteData.celular,
                clienteData.direccion,
                id
            ];

            conexion.query(query, valores, (err, resultado) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultado);
            });
        });
    },

    // Actualizar contraseña
    actualizarContrasena: async (id, nuevaContrasena) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE clientes SET contrasena = ? WHERE id = ?';
            conexion.query(query, [nuevaContrasena, id], (err, resultado) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultado);
            });
        });
    },

    // Eliminar cliente
    eliminar: async (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM clientes WHERE id = ?';
            conexion.query(query, [id], (err, resultado) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultado);
            });
        });
    },

    // Verificar credenciales de cliente
    verificarCredenciales: async (correo, contrasena) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM clientes WHERE correo = ? AND contrasena = ?';
            conexion.query(query, [correo, contrasena], (err, resultados) => {
                if (err) {
                    return reject(err);
                }
                resolve(resultados[0]); // Devuelve el cliente encontrado o undefined
            });
        });
    }
};



module.exports = clientesModelo;