const db = require('../config/db');
const clientesModelo = require('../modelos/clientesModelo'); // Asegúrate de tener el modelo importado correctamente

// Iniciar sesión
const iniciarSesion = (req, res) => {
    const { correo, contrasena } = req.body;

    // Validar que los datos existen
    if (!correo || !contrasena) {
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    // Autenticar al cliente usando la función del modelo
    clientesModelo.autenticarCliente(correo, contrasena, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: 'Error al autenticar. Inténtalo nuevamente más tarde.' });
        }
        if (!usuario) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Almacenar la información del usuario en la sesión
        req.session.usuario = usuario;
        
        // Redirigir a la página principal del cliente
        res.redirect('/cliente/inicio1.html');  
    });
};

// Función para autenticar un cliente
const autenticarCliente = (correo, contrasena, callback) => {
    const sql = `SELECT * FROM clientes WHERE correo = ? AND contrasena = ?`; // Cambiar esto si usas hashing

    // Ejecutar la consulta
    db.query(sql, [correo, contrasena], (err, result) => {
        if (err) {
            return callback(err); // Manejar el error en la consulta
        }
        if (result.length > 0) {
            console.log(result[0]); // Debug: Información del cliente encontrado
            callback(null, result[0]);  // Usuario encontrado
        } else {
            callback(null, null);  // Usuario no encontrado
        }
    });
};

// Exportar las funciones para su uso en otros módulos
module.exports = {
    iniciarSesion,
    autenticarCliente
};
