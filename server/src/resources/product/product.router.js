const express = require("express");
const { getProducts, getProductById, createProduct } = require("./product.controller")
const { ProductModel, productValidateSchema } = require("./product.model")
const {validate} = require('../middlewares')
const productRouter = express.Router()

.get("/products", getProducts)
.get ('/:id', getProductById)
.post('/products', validate(productValidateSchema) ,createProduct);

module.exports = { productRouter };