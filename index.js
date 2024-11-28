const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Cambié el puerto a 3005 para evitar conflictos

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración para el análisis del cuerpo de las solicitudes (formularios)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu-secreto-aqui', // Cambia este valor por uno más seguro
    resave: false,
    saveUninitialized: true
}));

// Configuración adicional para servir archivos HTML desde la carpeta 'vistas'
app.use(express.static(path.join(__dirname, 'vistas')));

// Importar Rutas
const clientesRutas = require('./rutas/clientesRutas');

const loginRutas = require('./rutas/loginRutas'); 

const vehiculosRutas = require('./rutas/vehiculoRutas');

const serviciosRutas = require('./rutas/serviciosRutas');

const repuestosRutas = require('./rutas/repuestoRutas')

const historialRutas = require('./rutas/historialRutas')

const empleadoRutas = require('./rutas/empleadosRutas')

const clienteRutas = require('./rutas/clienteRutas')

const citasRutas = require('./rutas/citasRutas')

// Middleware para verificar si el usuario está autenticado
const verificarAutenticacion = (req, res, next) => {
    if (req.session.usuario) {
        return next(); // El usuario está autenticado, continuar con la siguiente función
    } else {
        res.redirect('/login'); // Si no está autenticado, redirigir a la página de login
    }
};

// Usar las rutas
app.use('/clientes', clientesRutas);

app.use('/login', loginRutas);

app.use('/vehiculos', vehiculosRutas);

app.use('/servicios', serviciosRutas);

app.use('/repuestos', repuestosRutas);

app.use('/historial', historialRutas);

app.use('/empleados', empleadoRutas)

app.use('/cliente', clienteRutas);

app.use('/citas', citasRutas)


// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

// Ruta para otros archivos HTML
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'login.html'));
});

app.get('/inicio1', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas','cliente', 'inicio1.html'));
});

app.get('/service', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'service.html'));
});

app.get('/mision', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'mision.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'contact.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'about.html'));
});


// Nueva ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/'); // Redirigir a la página principal (index.html)
    });
});

// Nueva ruta /session-info para obtener la información de la sesión
app.get('/session-info', (req, res) => {
    if (req.session.usuario) {
        res.json({
            nombres: req.session.usuario.nombres,
            correo: req.session.usuario.correo
        });
    } else {
        res.json({});
    }
});

// Manejador de errores 404 (Página no encontrada)
app.use((req, res, next) => {
    const error = new Error('Página no encontrada');
    error.status = 404;
    next(error);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: app.get('env') === 'development' ? err.stack : {}
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});