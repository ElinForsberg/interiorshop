const express = require("express");
const { getOrders, getPersonalOrders, markOrderAsShipped } = require("./order.controller");
const { isAdmin, authorization } = require("../middlewares")
const orderRouter = express.Router()


orderRouter.get("/orders", authorization, isAdmin, getOrders);
orderRouter.get("/orders/personal", authorization, getPersonalOrders);
orderRouter.patch('/orders/:id', authorization, isAdmin, markOrderAsShipped)

module.exports = { orderRouter };