const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const esAdmin = require('../middleware/esAdmin');
const { registroUsuario } = require('../middleware/validaciones');
const validarCampos = require('../middleware/validarCampos');


// Obtener todos los usuarios (solo admin)
router.get('/', [auth, esAdmin], async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Crear usuario (solo admin)
router.post('/', [auth, esAdmin, ...registroUsuario, validarCampos], async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Inactivar usuario (solo admin)
router.patch('/:id/inactivar', [auth, esAdmin], async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, { estado: false }, { new: true });
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
