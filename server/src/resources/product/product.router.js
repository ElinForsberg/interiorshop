const express = require("express");
const { getProducts, getProductById } = require("./product.controler")
const productRouter = express.Router()

.get("/products", getProducts)
.get ('/:id', getProductById)


module.exports = { productRouter };