const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const orderRoute = require('./routes/orderRoute');
const utilRoutes = require('./routes/utilRoutes');

dotenv.config({ path: './config.env' });

const app = express();
const createMqttClient = require('./utils/mqttClientConstructor');

const mqttClient = createMqttClient();

app.use((req, res, next) => {
  req.mqttClient = mqttClient; // Change this line
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/order', orderRoute);
app.use('/utilRoutes', utilRoutes);

// Publish message on startup
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

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
module.exports = app;
