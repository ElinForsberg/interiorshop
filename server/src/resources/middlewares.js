//validate schema
const validate = (schema) => {

    return  function (req, res, next) {
      const { error } =  schema.validate(req.body);
      if (!error) return next();
      
     res.status(400).json(error.message);
    };
  }

  function authorization (req, res, next) {
    if (req.session?._id) return next();
    res.status(401).json("You must login to perform this request");
  }

  
  const isAdmin = (req, res, next) => {
    const user = req.session;
    if(user.isAdmin === false){
      return res.status(403).json("You are not admin");
     
    } else {
      next()
    }
  }
  
  module.exports = { validate, authorization, isAdmin };
  