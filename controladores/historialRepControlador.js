const historialReparacionesModelo = require('../modelos/historialReparacionesModelo'); // Asegúrate de tener el modelo importado correctamente

// Buscar reparación por ID
const buscarReparacionPorId = (req, res) => {
    const { id_Reparacion } = req.params;

    // Validar que el ID existe
    if (!id_Reparacion) {
        return res.status(400).json({ error: 'El ID de la reparación es requerido' });
    }

    historialReparacionesModelo.obtenerPorId(id_Reparacion)
        .then(reparacion => {
            if (!reparacion) {
                return res.status(404).json({ error: 'Reparación no encontrada' });
            }

            // Retornar la reparación encontrada
            res.status(200).json(reparacion);
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error al buscar la reparación.' });
        });
};

// Registrar una nueva reparación
const registrarReparacion = (req, res) => {
    const { Vehiculo, Servicio, Fecha, Descripcion, Costo } = req.body;

    // Validar que los datos necesarios existen
    if (!Vehiculo || !Servicio || !Fecha || !Descripcion || !Costo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevaReparacion = { Vehiculo, Servicio, Fecha, Descripcion, Costo };

    // Registrar la nueva reparación usando la función del modelo
    historialReparacionesModelo.registrarReparacion(nuevaReparacion)
        .then(resultado => {
            // Confirmar que la reparación ha sido registrada
            res.status(201).json({ message: 'Reparación registrada exitosamente', resultado });
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error al registrar la reparación. Inténtalo nuevamente más tarde.' });
        });
};

// Obtener todas las reparaciones
const obtenerTodasLasReparaciones = (req, res) => {
    historialReparacionesModelo.obtenerTodas()
        .then(reparaciones => {
            // Retornar la lista de reparaciones
            res.status(200).json(reparaciones);
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error al obtener las reparaciones.' });
        });
};

// Actualizar una reparación
const actualizarReparacion = (req, res) => {
    const { id_Reparacion } = req.params;
    const { Vehiculo, Servicio, Fecha, Descripcion, Costo } = req.body;

    // Validar que los datos necesarios existen
    if (!Vehiculo || !Servicio || !Fecha || !Descripcion || !Costo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const reparacionActualizada = { Vehiculo, Servicio, Fecha, Descripcion, Costo };

    // Actualizar la reparación en la base de datos
    historialReparacionesModelo.actualizar(id_Reparacion, reparacionActualizada)
        .then(resultado => {
            // Confirmar la actualización de la reparación
            res.status(200).json({ message: 'Reparación actualizada exitosamente', resultado });
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error al actualizar la reparación.' });
        });
};

// Eliminar una reparación
const eliminarReparacion = (req, res) => {
    const { id_Reparacion } = req.params;

    // Validar que el ID existe
    if (!id_Reparacion) {
        return res.status(400).json({ error: 'El ID de la reparación es requerido' });
    }

    // Eliminar la reparación de la base de datos
    historialReparacionesModelo.eliminar(id_Reparacion)
        .then(resultado => {
            // Confirmar que la reparación ha sido eliminada
            res.status(200).json({ message: 'Reparación eliminada exitosamente', resultado });
        })
        .catch(err => {
            return res.status(500).json({ error: 'Error al eliminar la reparación.' });
        });
};

// Exportar las funciones para su uso en otros módulos
module.exports = {
    buscarReparacionPorId,
    registrarReparacion,
    obtenerTodasLasReparaciones,
    actualizarReparacion,
    eliminarReparacion
};
