/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
/* const bodyParser = require('body-parser'); */
const cors = require('cors');
const helmet = require('helmet');
const orderRoute = require('./routes/orderRoute');
const MQTTService = require('./mqttConstractor');

// Create an instance of MQTTService
const mqttService = new MQTTService();
mqttService.connect(
  process.env.MQTT_USERNAME,
  process.env.MQTT_PASSWORD,
  process.env.MQTT_CLIENT_CONNECT_STRING,
);

// Start express app
const app = express();

app.use(helmet());

const corsOptions = {
  origin: 'https://taco-mazama-front.onrender.com',
  optionsSuccessStatus: 200,
};

// Pass the mqttService instance to the controllers
app.use((req, res, next) => {
  req.mqttService = mqttService;
  next();
});

// 3) ROUTES
app.use(express.json());
app.use('/order', cors(corsOptions), orderRoute);

module.exports = app;
