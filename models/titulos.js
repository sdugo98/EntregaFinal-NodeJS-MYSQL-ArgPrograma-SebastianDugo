const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config.js'); //  Usa '../' para retroceder un nivel

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const Titulos = sequelize.define('titulos', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  poster: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  titulo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  categoria: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0,
  },

  resumen: {
    type: DataTypes.STRING(948),
    allowNull: true,
  },

  temporadas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  trailer: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
     // Opciones de configuración adicionales
  tableName: 'titulos', // Especifica el nombre de la vista en la base de datos
  timestamps: false, // Si la vista no tiene timestamps
  sync: { force: false } // Evita la sincronización automática
});

module.exports = Titulos;