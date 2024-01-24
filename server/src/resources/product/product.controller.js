const { initStripe } = require("../../stripe");
const stripe = initStripe();
const { ProductModel } = require("./product.model")


//Get all products from Stripe
const getProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            limit: 50,
            expand: ["data.default_price"],
        });

        // Convert the Stripe response to JSON explicitly
        const productsJSON = JSON.parse(JSON.stringify(products));

        res.setHeader('Content-Type', 'application/json'); // Set content type to JSON
        res.status(200).json(productsJSON);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};



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
        const productById = await stripe.products.retrieve(productId,(
            {
                expand: ['default_price']
            }
        ));
        
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

const getProductWithPrice = async (req, res) => {
    try {
      const productId = String(req.params.id);
      const productById = await stripe.products.retrieve(productId);
  
      if (!productById || productById.deleted) {
        return res.status(404).json(`Product with ${req.params.id} was not found`);
      }
  
      // Fetch the prices associated with the product
      const prices = await stripe.prices.list({ product: productId });
  
      
      // Include price information in the response
      const productWithPrices = {
        ...productById,
        prices: prices.data,
      };
  
      res.status(200).json(productWithPrices);
    } catch (err) {
      if (err.code === 'resource_missing') {
        return res.status(404).json(`Product with ID ${req.params.id} was not found`);
      }
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


//Update inStock as admin in mongoDb
const updateProductInStock = async (req, res) => {
    
        try{
         const product = await ProductModel.findOne({_id: req.params.id})
            if(!product){
             return res.status(404).json(`Product with ${req.params.id} was not found`)
           }    
     
         const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
     
             res.status(200).json(updatedProduct)
     
             } catch (error) {
                 res.status(404).json(error);
             
         }
     }

//Create new product in mongodB
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

module.exports = { getProducts, getAllProducts, getProductById, updateProductInStock, createProduct, getProductWithPrice  }
