const completedOrder = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res) => {
  const doc = await completedOrder.create(req.body);
  const { tableNo, price, dish, sides, beverages } = doc;

  const orderData = {
    tableNo,
    price,
    dish,
    sides,
    beverages,
  };

  const { mqttService } = req; // Get the mqttService instance from the request

  if (!mqttService) {
    console.error('MQTTService instance not available');
    return res
      .status(500)
      .json({ error: 'MQTTService instance not available' });
  }

  // Construct the message to publish
  const messageToPublish = JSON.stringify({
    order: orderData,
  });

  // Use the mqttService instance to publish the message
  mqttService.publish(process.env.MQTT_TOPIC, messageToPublish);
  console.log(
    `Message published on topic '${process.env.MQTT_TOPIC}': SUCCESS}`,
  );

  // Send the response here
  res.status(201).json({
    status: 'success',
  });
});
