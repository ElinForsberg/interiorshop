const { initStripe } = require("../../stripe");
const stripe = initStripe();

const getProducts = async (req,res) => {
    try {
        const products= await stripe.products.list({
            limit: 10,
            expand: ["data.default_price"],
         });
         res.status(200).json(products)
    } catch(err){
        console.log(err);
        res.status(400).json("something went wrong")
    }
} 

const getProductById = async (req,res) => {
    try {
        const productId = String(req.params.id); // Convert to string explicitly
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
        res.status(400).json("something went wrong")
    }
}

module.exports = { getProducts, getProductById }
