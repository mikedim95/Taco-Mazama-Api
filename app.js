const express = require('express');
const orderRoute = require('./routes/orderRoute');

// Start express app

const app = express();

// 3) ROUTES
app.use('/api/v1/order', orderRoute);



module.exports = app;
