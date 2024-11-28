const serviciosModelo = require('../modelos/serviciosModelo');


const getAllServicio = (req, res) => {
    serviciosModelo.getAllServicio((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener los servicios', error})
    }
    res.json(results);
    }
) 
}

const getServicioById = (req, res) => {
    const id = req.params.id;
    serviciosModelo.getServicioById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el servicio', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(result);
    });
};

const addServicio = (req, res) => {
    const servicio = req.body;
    serviciosModelo.addServicio(servicio, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateServicio = (req, res) => {
    const id = req.params.id;
    const servicio = req.body;
    serviciosModelo.updateServicio(id, servicio, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el servicio', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente', result });
    });
};

const deleteServicio = (req, res) => {
    const id = req.params.id;
    serviciosModelo.deleteServicio(id, (error, result) => {
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
    
    getAllServicio,
    getServicioById,
    addServicio,
    updateServicio,
    deleteServicio
};
