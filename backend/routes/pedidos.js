
const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const auth = require('../middleware/auth');
const esAdmin = require('../middleware/esAdmin');
const { pedido: validarPedido } = require('../middleware/validaciones');
const validarCampos = require('../middleware/validarCampos');


// Obtener todos los pedidos (protegido)
router.get('/', auth, async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('usuario').populate('menu');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Crear pedido (protegido)
router.post('/', [auth, ...validarPedido, validarCampos], async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Modificar estado de pedido (solo admin)
router.patch('/:id/estado', [auth, esAdmin], async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, { estado: req.body.estado }, { new: true });
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
