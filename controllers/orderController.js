const completedOrder = require('../models/orderModel');
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  const doc = await completedOrder.create(req.body);

  const { mqttService } = req; // Get the mqttService instance from the request

  if (!mqttService) {
    console.error("MQTTService instance not available");
    return;
  }

  // Modify the doc object before publishing
  const modifiedPrice = doc.price;

  // Construct the message to publish
  const messageToPublish = JSON.stringify({
    price: modifiedPrice
  });

  // Use the mqttService instance to publish the message
  mqttService.publish(process.env.MQTT_TOPIC, messageToPublish);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
