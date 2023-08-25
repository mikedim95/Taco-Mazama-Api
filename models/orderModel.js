const mongoose = require('mongoose');


const completedOrderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, 'Order must have a price.']
  },
  dish: [{
    id: Number,
    title: String,
    stuffing: [String],
    ingredients: [String],
    salsa: [String],
    extras: [String],
    multiplier: {type: Number, required:true}
  }],
  sides: [{
    id: Number,
    title: String,
    multiplier: {type: Number, required:true}
  }],
  beverages: [{
    id: Number,
    title: String,
    multiplier: {type: Number, required:true}
  }]
}, { versionKey: false }); // Setting versionKey to false

const completedOrder = mongoose.model('CompletedOrder', completedOrderSchema);
module.exports = completedOrder;