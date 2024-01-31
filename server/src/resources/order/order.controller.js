const { OrderModel } = require("./order.model")

//get all orders only as admin
const getOrders = async (req, res) => {
  
    try {
      const user = req.session;
  
       await OrderModel.find({});
      if (user && user.isAdmin) {
        const orders = await OrderModel.find({});
        
        res.status(200).json(orders);
    } else {
        res.status(403).json({ error: "Unauthorized access. Admins only." });
    }
      
    } catch (error) {
        console.log("orders", orders);
      res.status(400).json({ error: error.message });
    }
  };

  //get personal orders if logged in user
  const getPersonalOrders = async (req, res) => {
    try {
      //get all orders for a specific user based on email from session
      const customer = req.session; 
      const customerMail = customer.email;
      // Fetch orders from MongoDB using the OrderModel
      const personalOrders = await OrderModel.find({ email: customerMail });
  
      if (personalOrders.length === 0) {
        return res.status(203).json("No orders found for this user");
      }
      res.status(200).json(personalOrders);
    } catch (error) {
      
      res.status(500).json({ message: "Internal Server error" });
    }
  };

  // as Admin, mark an order as Shipped
  const markOrderAsShipped = async (req, res) => {
    try {
     //update isShipped in database
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: String(req.params.id) },
        { $set: { isShipped: true } }, 
        { new: true }
      );
      
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(401).json(error.message);
    }
  };
  
  module.exports = { getOrders, getPersonalOrders, markOrderAsShipped };