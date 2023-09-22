const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const orderRoute = require('./routes/orderRoute');
const utilRoutes = require('./routes/utilRoutes');

const app = express();
app.use(helmet());
app.use(cors());

// Initialize MQTT service

// 3) ROUTES
app.use(express.json());
app.use('/order', orderRoute);
app.use('/utilRoutes', utilRoutes);

// Publish message on startup

module.exports = app;
