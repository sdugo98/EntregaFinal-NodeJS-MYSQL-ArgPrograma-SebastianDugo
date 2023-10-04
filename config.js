require('dotenv').config(); // Cargar variables de entorno desde .env

module.exports = {
  database: process.env.DB_NAME || 'trailerflix-project',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'sebas1998',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306, 
  dialect: process.env.DB_DIALECT || 'mysql',
};