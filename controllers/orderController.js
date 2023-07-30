const completedOrder = require('../models/orderModel');
const factory = require('./handlerFactory');

exports.createOrder = factory.createOne(completedOrder);