const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estado: { type: Boolean, default: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
