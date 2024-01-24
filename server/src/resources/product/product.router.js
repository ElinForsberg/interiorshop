const express = require("express");
const { getProducts, getAllProducts, getProductById, createProduct, updateProductInStock, getProductWithPrice  } = require("./product.controller")
const { ProductModel, productValidateSchema } = require("./product.model")
const {validate, authorization, isAdmin} = require('../middlewares')
const productRouter = express.Router()

productRouter.get("/products", getProducts)
productRouter.get("/dbproducts", getAllProducts)
productRouter.get ('/products/:id', getProductById)
productRouter.get('/products/price/:id', getProductWithPrice )
productRouter.post('/products', validate(productValidateSchema) ,createProduct);
productRouter.patch('/products/:id', authorization, isAdmin, updateProductInStock);

module.exports = { productRouter };