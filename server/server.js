// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const { mongoConnect } = require('./helpers/database')

// Get our API routes
const productRoutes = require('./routes/product');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Set our api routes
app.use('/products', productRoutes);

async function start() {
    try {
        await mongoConnect();
        console.log('Starting server...');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running at http://127.0.0.1:${port}/`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();