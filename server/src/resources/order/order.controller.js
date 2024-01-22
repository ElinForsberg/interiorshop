const { OrderModel } = require("./order.model")

//get all orders only as admin
const getOrders = async (req, res) => {
  
    try {
      const user = req.session;
  
      const orders = await OrderModel.find({});
      if (user && user.isAdmin) {
        const orders = await OrderModel.find({});
        console.log("orders", orders);
        res.status(200).json(orders);
    } else {
        res.status(403).json({ error: "Unauthorized access. Admins only." });
    }
      
    } catch (error) {
        console.log("orders", orders);
      res.status(400).json({ error: error.message });
    }
  }

  //get personal orders if logged in user
  const getPersonalOrders = async (req, res) => {
    try {
      const customer = req.session; // Assuming email is stored in the session
      const customerMail = customer.email;
      // Fetch orders from MongoDB using the OrderModel
      const personalOrders = await OrderModel.find({ email: customerMail });
  
      if (personalOrders.length === 0) {
        return res.status(203).json("No orders found for this user");
      }
      console.log("order användare",customer.email);
      res.status(200).json(personalOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };

  // as Admin, mark an order as Shipped
  const markOrderAsShipped = async (req, res) => {
    try {
      // const orderId = req.params.id;
      // const { isShipped } = req.body; 
  
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { _id: String(req.params.id) },
        { $set: { isShipped: true } }, // Update isShipped based on the received value
        { new: true }
      );
        console.log("isShipped?", req.params.id)
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(401).json(error.message);
    }
  };
  
  
  

  module.exports = { getOrders, getPersonalOrders, markOrderAsShipped };