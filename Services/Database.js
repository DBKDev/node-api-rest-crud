const mysql = require('mysql');
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(("Erreur lors de la connection à la base de donnée Node"), err.stack);
        return
    }
    console.log(connection.threadId);
})

module.exports = connection;