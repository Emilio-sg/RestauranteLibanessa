const { check } = require('express-validator');

exports.registroUsuario = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Email inválido').isEmail(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
];

exports.loginUsuario = [
  check('email', 'Email inválido').isEmail(),
  check('password', 'La contraseña es obligatoria').exists()
];

exports.menu = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('precio', 'El precio es obligatorio y debe ser numérico').isNumeric()
];

exports.pedido = [
  check('usuario', 'El usuario es obligatorio').not().isEmpty(),
  check('menu', 'El menú es obligatorio').isArray({ min: 1 })
];
