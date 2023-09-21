const express = require('express');
const orderController = require('../controllers/orderController');

const orderModel = require('../models/orderModel');

const router = express.Router();

// Define your route
router.post('/', (req, res, next) => {
  orderController.createOrder(req, res, next, orderModel);
});

module.exports = router;
