const express = require("express");
const { getProducts, getAllProducts, getProductById, createProduct } = require("./product.controller")
const { ProductModel, productValidateSchema } = require("./product.model")
const {validate} = require('../middlewares')
const productRouter = express.Router()

.get("/products", getProducts)
.get("/dbproducts", getAllProducts)
.get ('/products/:id', getProductById)
.post('/products', validate(productValidateSchema) ,createProduct);

module.exports = { productRouter };