const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config.js'); 

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'categorias',
  timestamps: false,
  sync: { force: false },
  freezeTableName: true, 
});

module.exports = Categoria;