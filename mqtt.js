/*  // app.js
const mqtt = require('mqtt');

const createMqttClient = () => {

const clientId = `emqx_nodejs_${  Math.random().toString(16).substring(2, 8)}`
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const clientConnectString = process.env.MQTT_CLIENT_CONNECT_STRING
// MQTT broker connection options
const client = mqtt.connect(clientConnectString, {
  clientId,
  username,
  password,
  // ...other options
})
// MQTT topic
const topic = process.env.MQTT_TOPIC;

 // Express route to publish a message
app.get('/:message', (req, res) => {
  const {message} = req.params;
  client.publish(topic, message);
  res.send(`Message published: ${message}`);
}); 

// MQTT subscription
client.on('connect', () => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
      } else {
        console.log('Subscribed to topic:', topic);
       } 
    });
  }); 

 client.on('message', (_topic, message) => {
  console.log('Received message:', message.toString());
}); 

return client;

};

module.exports = createMqttClient; */