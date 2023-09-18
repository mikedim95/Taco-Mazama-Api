const mqtt = require('mqtt');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const { MQTT_TOPIC } = process.env;

class MQTTService {
  constructor() {
    this.mqttClient = null;
  }

  connect(username, password, connectString, messageCallback) {
    this.mqttClient = mqtt.connect(connectString, {
      username,
      password,
    });

    this.mqttClient.on('error', (err) => {
      console.error('MQTT Error:', err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      console.log('MQTT client connected');
      this.mqttClient.subscribe(MQTT_TOPIC);
    });

    this.mqttClient.on('message', (topic, message) => {
      console.log(
        `Received message on topic '${topic}': ${message.toString()}`,
      );
      if (messageCallback) {
        messageCallback(topic, message);
      }
    });

    this.mqttClient.on('close', () => {
      console.log('MQTT client disconnected');
    });
  }

  publish(topic, message) {
    if (this.mqttClient) {
      this.mqttClient.publish(topic, message);
    } else {
      console.error('MQTT client not connected');
    }
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  }
}

module.exports = MQTTService;
