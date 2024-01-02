const validate = (schema) => {

    return  function (req, res, next) {
      const { error } =  schema.validate(req.body);
      if (!error) return next();
      console.log(error.message);
     res.status(400).json(error.message);
    };
  }

  const authorization = (req, res, next) => {
    console.log(req.session);
    if (req.session.user){
        next();
    } else {
      return res.status(401).json("You need to log in");
    }
  }
  
  const isAdmin = (req, res, next) => {
    const user = req.session.user;
    if(user.isAdmin === false){
      return res.status(403).json("You are not admin");
     
    } else {
      next()
    }
  }
  
  module.exports = { validate, authorization, isAdmin };
  