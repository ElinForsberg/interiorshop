const express = require("express");
const { registerCheckout, verifyPayment } = require("./checkout.controller")
const checkoutRouter = express.Router()

.post("/create-checkout-session",registerCheckout)
.post("/verifySession", verifyPayment)


module.exports = { checkoutRouter };