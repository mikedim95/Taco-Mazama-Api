const express = require('express');
const orderController = require('../controllers/orderController');
const {
  ipAuthMiddleware,
  /* updatePublicIP, */
} = require('../middlewares/ipAuthentication'); // Update the path accordingly
const orderModel = require('../models/orderModel');

const router = express.Router();

// Define your route
router.post('/', /* updatePublicIP,  */ ipAuthMiddleware, (req, res, next) => {
  console.log(req.body);
  orderController.createOrder(req, res, next, orderModel);
});

module.exports = router;
