const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, default: Date.now },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  estado: { type: String, enum: ['pendiente', 'realizado'], default: 'pendiente' }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
