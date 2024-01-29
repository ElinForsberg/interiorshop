//Här ska vi exportera massa funktioner
const bcrypt = require("bcrypt");
const { UserModel } = require("./user.model");
const { initStripe } = require("../../stripe");
const stripe = initStripe();

//Create /register a new user and save to MongoDb
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

   await UserModel.create({
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
};

//login an existing user
async function loginUser(req, res) {
  // Check if username and password is correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    return res.status(401).json("Wrong password or username");
  }

  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  // Check if user already is logged in
  if (req.session._id) {
    return res.status(200).json(user);
  }

  // Save info about the user to the session (an encrypted cookie stored on the client)
  req.session = user;
  res.status(200).json(user);
};

    //logout user
  async function logoutUser(req, res) {
    req.session = null;
    res.status(204).json("Successfully logged out");
  };

//authorisation function to see if cookies are in session
  async function authorize(req, res) {
    if (!req.session._id) {
      return res.status(401).json("You are not logged in");
    }
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    console.log("autentic",req.session);
    res.status(200).json(req.session);
  };

module.exports = { registerUser, loginUser, logoutUser, authorize }