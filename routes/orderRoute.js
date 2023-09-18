const express = require('express');
const orderController = require('../controllers/orderController');
const orderModel = require('../models/orderModel');

const router = express.Router();

// Define your route
router.post('/', (req, res, next) => {
  orderController.createOrder(req, res, next, orderModel);
  const data = req.body;
  console.log('Received data:', data);
  res.json({ message: 'Data received successfully!' });
});

module.exports = router;
