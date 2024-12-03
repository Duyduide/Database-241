const { Sequelize } = require('sequelize');

const dbname = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbname, user, password, {
  host: host,
  dialect: dialect,
  logging: false,
});

const connectionDatabase = async () => { 
    try {
        await sequelize.authenticate();
        console.log('::: Connection has been established successfully.');
      } catch (error) {
        console.error('::: Unable to connect to the database:', error);
      }
}

module.exports = {
    connectionDatabase,
}