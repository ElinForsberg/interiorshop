const { OrderModel } = require("./order.model")

//get all orders only as admin
async function getOrders(req, res) {
    const orders = await OrderModel.find({}).populate("customer");
    try {
      
      console.log("orders", orders);
      res.status(200).json(orders);
    } catch (error) {
        console.log("orders", orders);
      res.status(400).json({ error: error.message });
    }
  }

  //get personal orders if logged in user
  const getPersonalOrders = async (req, res) => {
    try {
      const customerId = req.session.customer; // Assuming email is stored in the session
      
      // Fetch orders from MongoDB using the OrderModel
      const personalOrders = await OrderModel.find({ customerId });
  
      if (personalOrders.length === 0) {
        return res.status(203).json("No orders found for this user");
      }
  
      res.status(200).json(personalOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  };
  

  module.exports = { getOrders, getPersonalOrders };