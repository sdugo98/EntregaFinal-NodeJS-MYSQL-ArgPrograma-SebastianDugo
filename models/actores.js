const { DataTypes, Sequelize } = require('sequelize');
const config = require('../config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const Actores = sequelize.define('actores', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  actor: {
    type: DataTypes.STRING(255), 
    allowNull: true,
  },
}, {
   tableName: 'actores', 
   timestamps: false, 
   sync: { force: false } 
});

module.exports = Actores;