
const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const auth = require('../middleware/auth');
const esAdmin = require('../middleware/esAdmin');
const { menu: validarMenu } = require('../middleware/validaciones');
const validarCampos = require('../middleware/validarCampos');


// Obtener todos los menús (público)
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Crear menú (solo admin)
router.post('/', [auth, esAdmin, ...validarMenu, validarCampos], async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Modificar menú (solo admin)
router.put('/:id', [auth, esAdmin, ...validarMenu, validarCampos], async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Eliminar menú (solo admin)
router.delete('/:id', [auth, esAdmin], async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menú eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
