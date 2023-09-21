const express = require('express');
const orderController = require('../controllers/orderController');
const {
  validateOrder,
  handleValidationErrors,
} = require('../utils/vallidation');
const orderModel = require('../models/orderModel');

const router = express.Router();

// Define your route
router.post(
  '/',
  /* validateOrder, handleValidationErrors,  */ (req, res, next) => {
    orderController.createOrder(req, res, next, orderModel);
  },
);

module.exports = router;
