const { initStripe } = require("../../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";
const { OrderModel } = require("../order/order.model")
const { ProductModel } = require("../product/product.model")


//Go to checkout and go to Stripe
const registerCheckout = async (req,res) => {
    
    try {
        //get customermail from session
        const customer = req.session; 
        const customerMail = customer.email;

        //create a session in stripe
        const session = await stripe.checkout.sessions.create({
            
            line_items: req.body.map((item) => {
                return {
                    price: item.product,
                    quantity: item.quantity,                 
                };  
                              
            }),  
            expand: ["line_items"],      
            shipping_address_collection: {
                allowed_countries: ['SE'],
              },          
            customer: req.session.id,
            customer_creation: "always",
            customer_email: customerMail,
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
            allow_promotion_codes: true,   
            
        });
        
        res.status(200).json({url: session.url, sessionId: session.id, session: session})
               
    } catch (error) {
        console.log(error.message);
        res.status(400).json("session was not created")
    } 
}
//If payment is verified in Stripe, go back to page and create order
const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status !== "paid") {
            return res.status(400).json({verified: false});
        }
        const products = await stripe.checkout.sessions.listLineItems(sessionId);

        const createdDate = new Date(session.created * 1000);
        const formattedDate = createdDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
        
        const customerDetails = session.customer_details || {};
        const orderData = {
            created: formattedDate,
            name: customerDetails.name || 'Unknown',
            email: customerDetails.email || 'Unknown',
            customerId: session.customer || 'Unknown',
            address: {
                city: customerDetails.address.city || 'Unknown',
                country: customerDetails.address.country || 'Unknown',
                street: customerDetails.address.line1 || 'Unknown',
                street2: customerDetails.address.line2 || '',
                postal_code: customerDetails.address.postal_code || '',
              },
            
            totalSum: (parseFloat(session.amount_total) / 100).toFixed(2),
            products: products.data.map((item) => ({
                
                description: item.description,
                stripeId: item.price.product,
                quantity: item.quantity,
                image: item.image,
                price: (parseFloat(item.price.unit_amount) / 100).toFixed(2),
                currency: item.price.currency,
                total: (parseFloat(item.amount_total) / 100).toFixed(2),
                
            })),
            isShipped: false,
        };
       
        const order = await new OrderModel(orderData).save();

        // Update inStock for purchased products
        for (const product of order.products) {
            
            const foundProduct = await ProductModel.findOne({ stripeId: product.stripeId });
            
            if (foundProduct) {
                foundProduct.inStock = foundProduct.inStock - product.quantity;
                await foundProduct.save();
            }
        }
        
       
        
        return res.status(201).json({ verified: true, order });
    } catch (error) {
        console.error('Error in verifyPayment:', error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { registerCheckout, verifyPayment };
