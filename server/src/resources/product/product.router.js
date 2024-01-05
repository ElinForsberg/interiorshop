const express = require("express");
const { getProducts, getAllProducts, getProductById, createProduct, updateProductInStock } = require("./product.controller")
const { ProductModel, productValidateSchema } = require("./product.model")
const {validate} = require('../middlewares')
const productRouter = express.Router()

productRouter.get("/products", getProducts)
productRouter.get("/dbproducts", getAllProducts)
productRouter.get ('/products/:id', getProductById)
productRouter.post('/products', validate(productValidateSchema) ,createProduct);
productRouter.put('/products/:id', updateProductInStock);

module.exports = { productRouter };