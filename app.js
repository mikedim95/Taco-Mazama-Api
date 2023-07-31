const express = require('express');
const bodyParser = require('body-parser');
const orderRoute = require('./routes/orderRoute');

// Start express app

const app = express();

// 3) ROUTES
app.use(bodyParser.json());
app.use('/api/v1/order', orderRoute);



module.exports = app;
