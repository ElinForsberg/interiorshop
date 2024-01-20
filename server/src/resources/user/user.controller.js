//Här ska vi exportera massa funktioner
const bcrypt = require("bcrypt");
const { UserModel } = require("./user.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();


async function registerUser(req, res, next) {
  const {email, name, password: plainTextPassword, isAdmin} = await new UserModel(req.body);
  const existingUser = await UserModel.findOne({email: req.body.email})
  const isAdminBool = isAdmin === true || isAdmin === 'true';

  if(existingUser){
    return res.status(409).json("this email adress has already been used")
  }

  const salt = await bcrypt.genSalt()
  const password = await bcrypt.hash(plainTextPassword, salt)
   
  try {
    const stripeUser = await stripe.customers.create({
        email: email,
        name: name,
      }) 

   await UserModel.create({
    stripeId: stripeUser.id,
    email,
    name,
    password,
    isAdmin: isAdminBool
   })
   
   const user = await UserModel.findOne({email: req.body.email}).select('-password');
    console.log("isadminoo", isAdmin);
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
}

async function loginUser(req, res) {
    const { email, password} = req.body;
    const user = await UserModel.findOne({email});
  try{
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json("Wrong email or password");
      }
      req.session = user;
      
    console.log("login", user);
    const loggedInUser = await UserModel.findOne({email: email}).select('-password');
    
    res.status(200).json(loggedInUser);
  } catch(error) {
    res.status(404).json(error.message);
  }
  }
    
  async function logoutUser(req, res) {
    req.session = null;
    res.status(204).json("Successfully logged out");
  }

  async function authorize(req, res) {
    if (!req.session._id) {
      return res.status(401).json("You are not logged in");
    }
    console.log("autentic",req.session);
    res.status(200).json(req.session);
  }

module.exports = { registerUser, loginUser, logoutUser, authorize }