const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config.js'); 
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const Catalogo = sequelize.define('catalogo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  poster: {
    type: DataTypes.STRING(255), 
    allowNull: true,
    defaultValue: null,
  },

  titulo: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },

  categoria: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },

  genero: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },

  resumen: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },

  temporadas: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },

  reparto: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },

  trailer: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },
}, {

  tableName: 'catalogocompleto', 
  timestamps: false, 
  sync: { force: false } 
});

module.exports = Catalogo;