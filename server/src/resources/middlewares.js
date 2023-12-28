function validate(schema) {

    return  function (req, res, next) {
      const { error } =  schema.validate(req.body);
      if (!error) return next();
      console.log(error.message);
     res.status(400).json(error.message);
    };
  }

  module.exports = { validate };