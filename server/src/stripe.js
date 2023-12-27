const initStripe = () => {
    require("dotenv").config();
    const Stripe = require("stripe");
    return Stripe(process.env.STRIPE_SECRET_KEY);
};

module.exports = { initStripe };