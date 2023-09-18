const mongoose = require('mongoose');

const completedOrderSchema = new mongoose.Schema(
  {
    tableNo: {
      id: Number,
      type: Number,
      required: [true, 'Order must coming from a table.'],
    },
    price: {
      type: Number,
      required: [true, 'Order must have a price.'],
    },
    dish: [
      {
        _id: false,
        id: Number,
        title: String,
        stuffing: [String],
        ingredients: [String],
        salsa: [String],
        extras: [String],
        multiplier: { type: Number, required: true },
        comments: [String],
      },
    ],
    sides: [
      {
        _id: false,
        id: Number,
        title: String,
        multiplier: { type: Number, required: true },
        comments: [String],
      },
    ],
    beverages: [
      {
        _id: false,
        id: Number,
        title: String,
        multiplier: { type: Number, required: true },
        comments: [String],
      },
    ],
  },
  { versionKey: false },
); // Setting versionKey to false

const completedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = completedOrder;
