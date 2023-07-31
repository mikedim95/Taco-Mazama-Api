const mongoose = require('mongoose');

/* // Set global configuration option to remove the '__v' field
mongoose.set('versionKey', false); */

const completedOrderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, 'Order must have a price.']
  },
}, { versionKey: false }); // Setting versionKey to false

const completedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = completedOrder;