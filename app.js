const express = require('express');
const bodyParser = require('body-parser');
const orderRoute = require('./routes/orderRoute');
const MQTTService = require('./mqttConstractor');

// Create an instance of MQTTService
const mqttService = new MQTTService();
mqttService.connect(
  process.env.MQTT_USERNAME,
  process.env.MQTT_PASSWORD,
  process.env.MQTT_CLIENT_CONNECT_STRING
);

// Start express app
const app = express();

// Pass the mqttService instance to the controllers
app.use((req, res, next) => {
  req.mqttService = mqttService;
  next();
});

// 3) ROUTES
app.use(bodyParser.json());
app.use('/api/v1/order', orderRoute);

module.exports = app;
