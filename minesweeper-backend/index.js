// Entry Point of the API Server

const express = require('express');

/**
 * Creates an Express application.
 * 
 * The expres() function is a top-level function
 * exported by the express module.
 */
const app = express();
const Pool = require('pg').Pool;

// I'm not entirely sure what a Pool object is...
// it connects with a SQL server
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'minesweeper',
    password: 'password',
    dialect: 'postgres',
    port: 5432
});

/**
 * To handle the HTTP methods Body Parser is used,
 * generally to extract the entire body portion of
 * an incoming request stream and exposes it on req.body
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack
        );
    }

    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error(
                'Error executing query', err.stack
            );
        }

        console.log('Connected to Database!');
    })
})