const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mysql://root:secret@localhost:3306/mysqldb",{
    dialect: 'mysql'
  });

sequelize.query('CREATE DATABASE IF NOT EXISTS mysqldb;')
  .then(() => {
    console.log('Database created or already exists');
  })
  .catch(err => {
    console.error('Unable to create database:', err);
  });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize