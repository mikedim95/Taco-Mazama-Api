const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const MQTTService = require('./mqttConstructor');
const mqttService = new MQTTService();
mqttService.connect(
  process.env.MQTT_USERNAME,
  process.env.MQTT_PASSWORD,
  process.env.MQTT_CLIENT_CONNECT_STRING,
);

// Pass the mqttService instance to the controllers
app.use((req, res, next) => {
  req.mqttService = mqttService;
  next();
});
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');

    // Start the Express server
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });

    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('💥 Process terminated!');
      });
    });
  });
mqttService.publish(
  'updatePublicIP',
  'from cloud API to get the TACO public IP in app.js',
);
