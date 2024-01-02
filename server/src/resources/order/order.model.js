const {Schema, model, models} = require('mongoose');

// Define the schema for the Order
const OrderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    city: String,
    country: String,
    street: String,
    street2: String,
    postal_code: String,
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
      total: Number,
      _id: String,
      stripeId: String,
    },
  ],
});

// Create the Mongoose model for the Order

const OrderModel = models.order || model('order', OrderSchema);


module.exports = { OrderModel };

