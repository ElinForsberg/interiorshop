const express = require("express");
const { getOrders, getPersonalOrders } = require("./order.controller");
const { isAdmin, authorization } = require("../middlewares")
const orderRouter = express.Router()


orderRouter.get("/orders", isAdmin, getOrders);
orderRouter.get("/orders/personal", authorization, getPersonalOrders);

module.exports = { orderRouter };