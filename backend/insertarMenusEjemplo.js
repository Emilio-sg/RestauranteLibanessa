const mongoose = require('mongoose');

const Menu = require('./models/Menu');

mongoose.connect('mongodb://localhost:27017/libanessa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const menus = [
  {
    nombre: 'Shawarma',
    precio: 1500,
    detalle: 'Carne, vegetales y salsa en pan pita',
    categoria: 'Principal',
    estado: true
  },
  {
    nombre: 'Tabule',
    precio: 900,
    detalle: 'Ensalada de trigo, tomate, perejil y limón',
    categoria: 'Entrada',
    estado: true
  },
  {
    nombre: 'Baklava',
    precio: 700,
    detalle: 'Dulce de masa filo, nueces y miel',
    categoria: 'Postre',
    estado: true
  }
];

Menu.insertMany(menus)
  .then(() => {
    console.log('Menús de ejemplo insertados');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error al insertar menús:', err);
    mongoose.disconnect();
  });
