const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: Boolean, default: true },
  precio: { type: Number, required: true },
  detalle: { type: String },
  categoria: { type: String }
});

module.exports = mongoose.model('Menu', MenuSchema);
