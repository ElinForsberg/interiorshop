const { initStripe } = require("../../stripe");
const stripe = initStripe();
const { ProductModel } = require("./product.model")

//Get all products from Stripe
const getProducts = async (req,res) => {
    try {
        const products= await stripe.products.list({
            limit: 10,
            expand: ["data.default_price"],
         });
         res.status(200).json(products)
    } catch(err){
        console.log(err);
        res.status(400).json(err.message)
    }
} 

//Get all products from MongoDb
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).json(products)
        } catch (error) {
            res.status(404).json(error);
        }
}

//Get one product by id from Stripe
const getProductById = async (req,res) => {
    try {
        const productId = String(req.params.id); // Convert to string
        const productById = await stripe.products.retrieve(productId);
        
        if (!productById || productById.deleted){
            return res.status(404).json(`Product with ${req.params.id} was not found`)
        }
        res.status(200).json(productById)
    } catch(err){
        if (err.code === 'resource_missing') {
            return res.status(404).json(`Product with ID ${req.params.id} was not found`);
        }
        console.log(err);
        res.status(400).json(err.message)
    }
}

//Get product by category
const getProductByCategory = async (req, res) => {
    try {
    const productsByCategory = await ProductModel.find({categories: req.params.id})
    console.log(productsByCategory);
    
    res.status(200).json(productsByCategory)
    } catch (error) {
        res.status(404).json(error);
    }
    
}

const createProduct = async(req,res) => {
   
    const {title, inStock, stripeId} = req.body;
    console.log(title);
    try {

        const product = await ProductModel.create({
            stripeId: stripeId,
            title: title,
            inStock: inStock,
            
        });
       
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error.message);
    }   
}

module.exports = { getProducts, getAllProducts, getProductById, getProductByCategory, createProduct }
