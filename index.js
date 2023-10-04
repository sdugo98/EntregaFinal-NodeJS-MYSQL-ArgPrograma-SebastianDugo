// console.log("esta es la ruta :", __dirname);

const sequelize = require('./sequelize');
const Actores = require('./models/actores.js');
const Catalogo = require('./models/catalogo.js');
const Categorias = require('./models/categorias.js');
const Genero = require('./models/genero.js');
const Participaciones = require('./models/participaciones.js');
const Titulos = require('./models/titulos.js');
const CatalogoView = require('./models/catalogoview.js');

async function iniciarProyecto() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await sequelize.sync({ force: false }); // crea las tablas en cada inicio

    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar la base de datos:', error);
  }
}

iniciarProyecto();