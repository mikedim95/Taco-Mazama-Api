const mongoose = require('mongoose');

function func(value) {
  return /^[1-9\s]+$/.test(value);
}
const completedOrderSchema = new mongoose.Schema(
  {
    tableNo: {
      id: Number,
      type: Number,
      required: [true, 'Order must coming from a table.'],
      validate: [func, 'is not a valid String!'],
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
        extra: [String],
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
