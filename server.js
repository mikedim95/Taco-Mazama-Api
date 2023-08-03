const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const createMqttServer = require('./mqtt');

process.on('uncaughtException', err => {
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

    // Create the MQTT server instance
    const mqttServer = createMqttServer();

    // Start the Express server
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);

      // Start the MQTT server on a different port
      const mqttPort = 8883;
      mqttServer.listen(mqttPort, () => {
        console.log(`MQTT server is listening on port ${mqttPort}...`);
      });
    });

    process.on('unhandledRejection', err => {
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