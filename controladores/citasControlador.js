const citasModelo = require('../modelos/citasModelo');


const getAllCita = (req, res) => {
    citasModelo.getAllCita((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener las citas', error})
    }
    res.json(results);
    }
) 
}

const getCitaById = (req, res) => {
    const id = req.params.id;
    citasModelo.getCitaById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener la cita', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Cita no encontrado' });
        }
        res.json(result);
    });
};

const addCita = (req, res) => {
    const cita = req.body;
    citasModelo.addCita(cita, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateCita = (req, res) => {
    const id = req.params.id;
    const cita = req.body;
    citasModelo.updateCita(id, cita, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el servicio', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente', result });
    });
};

const deleteCita = (req, res) => {
    const id = req.params.id;
    citasModelo.deleteCita(id, (error, result) => {
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
    getAllCita,
    getCitaById,
    addCita,
    updateCita,
    deleteCita
};
