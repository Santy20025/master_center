const empleadoModelo = require('../modelos/empleadosModelo');


const getAllEmpleado = (req, res) => {
    empleadoModelo.getAllEmpleado((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener los servicios', error})
    }
    res.json(results);
    }
) 
}

const getEmpleadoById = (req, res) => {
    const id = req.params.id;
    empleadoModelo.getEmpleadoById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el Empleado', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json(result);
    });
};

const addEmpleado = (req, res) => {
    const empleado = req.body;
    empleadoModelo.addEmpleado(empleado, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateEmpleado = (req, res) => {
    const id = req.params.id;
    const empleado = req.body;
    empleadoModelo.updateEmpleado(id, empleado, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el servicio', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente', result });
    });
};

const deleteEmpleado = (req, res) => {
    const id = req.params.id;
    empleadoModelo.deleteEmpleado(id, (error, result) => {
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
    getAllEmpleado,
    getEmpleadoById,
    addEmpleado,
    updateEmpleado,
    deleteEmpleado
};
