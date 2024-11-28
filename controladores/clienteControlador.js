const clienteModelo = require('../modelos/clienteModelo');


const getAllcliente = (req, res) => {
    clienteModelo.getAllCliente((error, results)=> {
    if (error) {
        return res.status(500).json({ message: 'Error al obtener los servicios', error})
    }
    res.json(results);
    }
) 
}

const getClienteById = (req, res) => {
    const id = req.params.id;
    clienteModelo.getClienteById(id, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener el servicio', error });
        }
        if (!result) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(result);
    });
};

const addCliente = (req, res) => {
    const cliente = req.body;
    clienteModelo.addCliente(cliente, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al agregar el Servicio', error });
        }
        res.status(201).json({ message: 'Servicio agregado correctamente', result });
    });
};

const updateCliente = (req, res) => {
    const id = req.params.id;
    const cliente = req.body;
    clienteModelo.updateCliente(id, cliente, (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error al actualizar el servicio', error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Vehículo actualizado correctamente', result });
    });
};

const deleteCliente = (req, res) => {
    const id = req.params.id;
    clienteModelo.deleteCliente(id, (error, result) => {
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
    getAllcliente,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
};
