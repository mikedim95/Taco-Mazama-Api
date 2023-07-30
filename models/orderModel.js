const mongoose = require('mongoose');

const completedOrderSchema = new mongoose.Schema ({
    price: {
        type: Number,
        require: [true, 'Order must have a price.']
      }
});

const completedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = completedOrder;