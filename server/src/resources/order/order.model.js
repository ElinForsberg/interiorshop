const { boolean } = require('joi');
const {Schema, model, models} = require('mongoose');

// Define the schema for the Order
const OrderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  
    address: {
      city: { type: String },
      country: { type: String },
      street: { type: String },
      street2: { type: String },
      postal_code: { type: String },
    },
  
  totalSum: {
    type: Number,
    required: true,
  },
  products: [
    {
      description: String,
      quantity: Number,
      price: Number,
      currency: String,
      image: String,
      total: Number,
      _id: String,
      stripeId: String,
    },
  ],
  isShipped: {
    type: Boolean,
    default: false,
    required: true,
  }
});

// Create the Mongoose model for the Order

const OrderModel = models.order || model('order', OrderSchema);


module.exports = { OrderModel };

