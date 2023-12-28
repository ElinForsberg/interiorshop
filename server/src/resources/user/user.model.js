const { Schema, model, models } = require("mongoose");
const Joi = require("joi");
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])(?=.{8,})/;
  
const userValidateSchema = Joi.object({
    
  email: Joi.string().email().required(),
  name:Joi.string(),
  password: Joi.string()
  .required()
  .min(6)
  .pattern(passwordRegex)
  .message('Password must contain at least one capital letter, one number, one special character, and be at least 8 characters long')
});

const userSchema = new Schema({
  stripeId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

const UserModel = models.user || model("user", userSchema);

module.exports = { UserModel, userValidateSchema };
