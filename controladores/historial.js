const historialModelo = require('../modelos/historialModelo');


const getAllHistorial = (req, res) => {
    historialModelo.getAllHistorial((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener los servicios', error})
    }
    res.json(results);
    }
) 
}

const getHistorialById = (req, res) => {
    const id = req.params.id;
    historialModelo.getHistorialById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el servicio', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(result);
    });
};

const addHistorial = (req, res) => {
    const historial = req.body;
    historialModelo.addHistorial(historial, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateHistorial = (req, res) => {
    const id = req.params.id;
    const historial = req.body;
    historialModelo.updateHistorial(id, historial, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el Historial', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }
        res.json({ message: 'Historial actualizado correctamente', result });
    });
};

const deleteHistorial = (req, res) => {
    const id = req.params.id;
    historialModelo.deleteHistorial(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al eliminar el Servicio', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio eliminado correctamente', result });
    });
};

module.exports = {
    getAllHistorial,
    getHistorialById,
    addHistorial,
    updateHistorial,
    deleteHistorial
};
