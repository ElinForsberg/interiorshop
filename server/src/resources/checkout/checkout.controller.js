const { initStripe } = require("../../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";
const { OrderModel } = require("../order/order.model")
const registerCheckout = async (req,res) => {
    
    try {
        const session = await stripe.checkout.sessions.create({
            
            line_items: req.body.map((item) => {
                return {
                    price: item.product,
                    quantity: item.quantity,                     
                };  
                              
            }),      
            shipping_address_collection: {
                allowed_countries: ['SE'],
              },          
            customer: req.session.id,
            customer_creation: "always",
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

const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);
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
            customer: customerDetails.name || 'Unknown',
            email: customerDetails.email || 'Unknown',
            address: {
                city: customerDetails.city || 'Unknown',
                country: customerDetails.country || 'Unknown',
                street: customerDetails.line1 || 'Unknown',
                street2: customerDetails.line2 || '',
                postal_code: customerDetails.postal_code || '',
            },
            totalSum: (parseFloat(session.amount_total) / 100).toFixed(2),
            products: products.data.map((item) => ({
                description: item.description,
                quantity: item.quantity,
                price: (parseFloat(item.price.unit_amount) / 100).toFixed(2),
                currency: item.price.currency,
                total: (parseFloat(item.amount_total) / 100).toFixed(2),
            })),
        };
        console.log(customerDetails);
        const order = await new OrderModel(orderData).save();
        return res.status(201).json(order);
    } catch (error) {
        console.error('Error in verifyPayment:', error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { registerCheckout, verifyPayment };
