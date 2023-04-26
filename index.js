const express = require('express')
const bodyParser = require('body-parser')
const pipeline = require ('./utils/pipeline')
const mysql = require ('mysql2')

const app = express()
const port = 3027;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/phone', async function (req, res) {
    try {
        const { phone } = req.body
        const new_phone = await pipeline.execute(phone);
        res.status(201).json(new_phone);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
})

const server = app.listen(port, () => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "secret",
    });

    // Run create database statement
    connection.query(
        `CREATE DATABASE IF NOT EXISTS mysqldb`,
        function (err, results) {
            console.log(results);
            console.log(err);
        }
    );

    // Close the connection
    connection.end();
    console.log(`Example app listening on port ${port}!`)
})

// Handle server shutdown gracefully
const handleShutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  };
  
  // Listen for SIGINT and SIGTERM signals
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);