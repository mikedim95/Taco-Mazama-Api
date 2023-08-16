/* const catchAsync = require("../utils/catchAsync");
const MQTTService = require('../mqttConstractor');

exports.createOrder = catchAsync(async (req, res, next) => {
  const doc = await completedOrder.create(req.body);

  // Modify the doc object before publishing
  const modifiedPrice = doc.price;

  // Construct the message to publish
  const messageToPublish = JSON.stringify({
    price: modifiedPrice,
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
 */