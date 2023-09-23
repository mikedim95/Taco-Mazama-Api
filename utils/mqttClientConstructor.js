const mqtt = require('mqtt');
const mqttClientConstructor = () => {
  const clientId = 'Cloud_API';
  const username = process.env.MQTT_USERNAME;
  const password = process.env.MQTT_PASSWORD;
  const clientConnectString = process.env.MQTT_CLIENT_CONNECT_STRING;

  // MQTT broker connection
  const client = mqtt.connect(clientConnectString, {
    clientId,
    username,
    password,
  });

  // MQTT topic
  const topic = process.env.MQTT_TOPIC;
  const updatePublicIP = process.env.MQTT_updatePublicIP;

  // MQTT subscription
  client.on('connect', async () => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Error subscribing to topic:', err);
      } else {
        console.log('Subscribed to topic:', topic);
      }
    });
    client.publish(updatePublicIP, 'message', (err) => {
      if (!err) {
        console.log('Successfully published to topic:', updatePublicIP);
      } else {
        console.error('Error publishing to topic:', updatePublicIP, err);
      }
    });
  });
  client.on('error', (err) => {
    console.error('MQTT client error:', err);
  });
  client.on('reconnect', () => {
    console.log('Reconnecting to MQTT broker...');
  });
  client.on('close', () => {
    console.log('MQTT connection closed.');
  });
  // MQTT await message
  /* client.on('message', async (_topic, message) => {
    const receivedMessage = message.toString();
    switch (_topic) {
      case 'testTopic': {
        console.log(`Received message ${receivedMessage} on topic: testTopic`);

        const buildOrder = await buildOrderForPrinter(receivedMessage);

        console.log('Received message:', buildOrder);
        // Print the received message
        await printMessage(buildOrder);
        break;
      }
      case 'updatePublicIP': {
        const ip = await getLocalNodePublicIP();
        const temp = await postLocalNodePublicIP(ip);
        console.log(
          `LocalNode PublicIP to report: ${ip} \n API Server PublicIP reports: ${temp}`,
        );
      }
    }
  }); */

  /* const mqttClientInstance = {
    client,
    publishMessage: (topic, message) => {
      // Publish the message to the specified topic
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Error publishing message:", err);
        } else {
          console.log(`Message published to topic "${topic}": ${message}`);
        }
      });
    },
    function2: (topic, message) => {
      // Publish the message to the specified topic
      client.publish(topic, "function2", (err) => {
        if (err) {
          console.error("Error publishing message:", err);
        } else {
          console.log(`Message published to topic "${topic}": "function2"`);
        }
      });
    },
  }; 
*/
  return client;
};

module.exports = mqttClientConstructor;
