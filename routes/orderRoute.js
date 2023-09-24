const express = require('express');
const orderController = require('../controllers/orderController');
const {
  ipAuthMiddleware,
  /* updatePublicIP, */
} = require('../middlewares/ipAuthentication'); // Update the path accordingly
const orderModel = require('../models/orderModel');

const router = express.Router();

// Define your route
router.post('/', ipAuthMiddleware, async (req, res, next) => {
  try {
    const orderData = req.body; // Assuming your JSON data is in the request body
    await orderController.createOrder(req, res, null, orderData); // Pass the orderData to the controller

    // Respond with a success message or appropriate response
    res.status(200).send('Order created successfully');
  } catch (error) {
    console.error('Error:', error.message);

    // Send the error message and status code as the response
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
