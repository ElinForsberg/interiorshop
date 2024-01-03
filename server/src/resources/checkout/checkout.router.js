const express = require("express");
const { registerCheckout, verifyPayment } = require("./checkout.controller")
const checkoutRouter = express.Router()

.post("/registerCheckout",registerCheckout)
.post("/verifySession", verifyPayment)


module.exports = { checkoutRouter };