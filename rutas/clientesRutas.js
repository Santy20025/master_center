const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const clientesModelo = require('../modelos/clientesModelo');

// Ruta para registrarse
router.post('/registro', async (req, res) => {
    const { nombres, correo, contrasena, direccion, celular } = req.body;

    try {
        // Verificar si todos los campos están completos
        if (!nombres || !correo || !contrasena || !direccion || !celular) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        // Verificar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return res.status(400).json({ message: 'Formato de correo electrónico inválido.' });
        }

        // Verificar si el correo ya existe
        const usuarioExistente = await clientesModelo.buscarPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Este correo ya está registrado.' });
        }

        // Hashear la contraseña
        const hashContrasena = await bcrypt.hash(contrasena, 10);

        // Crear el objeto cliente
        const nuevoCliente = {
            nombres,
            correo,
            contrasena: hashContrasena,  // Usar la contraseña hasheada
            direccion,
            celular
            // No necesitas incluir fecha_registro aquí, se maneja en el SQL
        };

        // Registrar el cliente
        const resultado = await clientesModelo.registrarCliente(nuevoCliente);
        
        if (resultado.insertId) {
            // Redirigir a la página de inicio de sesión después de un registro exitoso
            return res.redirect('/login.html');
        } else {
            throw new Error('No se pudo completar el registro');
        }
        
    } catch (error) {
        console.error('Error registrando cliente:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor al registrar el cliente.',
            error: error.message 
        });
    }

    
});

// Ruta para recuperar contraseña
router.post('/recuperar-contrasena', async (req, res) => {
    const { correo, nueva_contrasena, repita_contrasena } = req.body;

    try {
        // Validaciones
        if (!correo || !nueva_contrasena || !repita_contrasena) {
            return res.status(400).json({ 
                success: false,
                message: 'Todos los campos son requeridos.' 
            });
        }

        if (nueva_contrasena !== repita_contrasena) {
            return res.status(400).json({ 
                success: false,
                message: 'Las contraseñas no coinciden.' 
            });
        }

        // Verificar que el usuario existe
        const usuario = await clientesModelo.buscarPorCorreo(correo);
        if (!usuario) {
            return res.status(404).json({ 
                success: false,
                message: 'No se encontró un cliente con ese correo.' 
            });
        }

        // Hashear la nueva contraseña
        const hashContrasena = await bcrypt.hash(nueva_contrasena, 10);

        // Actualizar la contraseña
        const resultado = await clientesModelo.actualizarContrasena(usuario.id, hashContrasena);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ 
                success: true,
                message: 'Contraseña actualizada correctamente. Ahora puede iniciar sesión.' 
            });
        } else {
            throw new Error('No se pudo actualizar la contraseña');
        }

    } catch (error) {
        console.error('Error actualizando contraseña:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor al actualizar la contraseña.',
            error: error.message 
        });
    }
});

// Agregar ruta para inicio de sesión
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Validaciones
        if (!correo || !contrasena) {
            return res.status(400).json({ 
                success: false,
                message: 'Correo y contraseña son requeridos.' 
            });
        }

        // Buscar usuario
        const cliente = await clientesModelo.buscarPorCorreo(correo);
        if (!cliente) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciales inválidas.' 
            });
        }

        // Verificar contraseña
        const contrasenasCoinciden = await bcrypt.compare(contrasena, cliente.contrasena);
        if (!contrasenasCoinciden) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciales inválidas.' 
            });
        }

        // Éxito en el login
        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            cliente: {
                id: cliente.id,
                nombres: cliente.nombres,
                correo: cliente.correo
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor durante el inicio de sesión.',
            error: error.message 
        });
    }
});

module.exports = router;