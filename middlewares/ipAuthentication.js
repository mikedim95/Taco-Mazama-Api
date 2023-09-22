const ipAuthMiddleware = (req, res, next) => {
  console.log(`entering ipAuthMiddleware`);
  const clientIP = req.ip;
  const TacosIP = req.app.locals.globalPublicIP;
  console.log(`clientIP: ${clientIP}`);
  console.log(`TacosIP: ${TacosIP}`);
  if (TacosIP === clientIP) {
    console.log(`IP address ${clientIP} is allowed.`);

    next();
  } else {
    // IP is not allowed, return a 403 Forbidden response
    res.status(403).send('Access denied for this IP address.');
  }
};

/* const updatePublicIP = (req, res, next) => {
  console.log('Entering updatePublicIP middleware');

  const mqttService = req.mqttService;
  console.log('Publishing to MQTT topic: updatePublicIP');

  mqttService.publish(
    'updatePublicIP',
    'from cloud API to get the TACO public IP',
    (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully');
      }
    },
  );

  next();
}; */
module.exports = { ipAuthMiddleware /* updatePublicIP */ };
