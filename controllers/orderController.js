const completedOrder = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const doc = await completedOrder.create(req.body);
  const { tableNo, price, dish, sides, beverages, size } = doc;

  const orderData = {
    tableNo,
    price,
    dish,
    sides,
    beverages,
    size,
  };

  const { mqttClient } = req; // Get the mqttClient instance from the request

  if (!mqttClient) {
    console.error('mqttClient instance not available');
    return res.status(500).json({ error: 'mqttClient instance not available' });
  }

  // Construct the message to publish
  const messageToPublish = JSON.stringify({
    order: orderData,
  });

  mqttClient.publish(
    process.env.MQTT_UPDATE_PUBLIC_IP,
    'messageToPublish',
    (err) => {
      if (err) {
        console.error('Error sending order to print', err);
      } else {
        console.log('Successfully sent order to print');
      }
    },
  );

  // Use the mqttClient instance to publish the message
  mqttClient.publish(process.env.MQTT_TOPIC, messageToPublish, (err) => {
    if (err) {
      console.error('Error publishing to topic:', process.env.MQTT_TOPIC, err);
    }

    console.log('Successfully sent order to print');

    // Send the response here
  });

  // Additional publishing
};
