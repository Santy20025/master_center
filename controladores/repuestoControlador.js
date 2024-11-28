const repuestosModelo = require('../modelos/repuestoModelo');


const getAllRespuesto = (req, res) => {
    repuestosModelo.getAllRespuesto((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener los servicios', error})
    }
    res.json(results);
    }
) 
}

const getRepuestoById = (req, res) => {
    const id = req.params.id;
    repuestosModelo.getRepuestoById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el servicio', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(result);
    });
};

const addRepuesto = (req, res) => {
    const repuesto = req.body;
    repuestosModelo.addRepuesto(repuesto, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateRepuesto = (req, res) => {
    const id = req.params.id;
    const repuesto = req.body;
    repuestosModelo.updateRepuesto(id, repuesto, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el repuesto', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Repuesto no encontrado' });
        }
        res.json({ message: 'Repuesto actualizado correctamente', result });
    });
};

const deleteRepuesto = (req, res) => {
    const id = req.params.id;
    repuestosModelo.deleteRepuesto(id, (error, result) => {
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
    getAllRespuesto,
    getRepuestoById,
    addRepuesto,
    updateRepuesto,
    deleteRepuesto
};
