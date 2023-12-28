const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const userValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  name:Joi.string().required(),
  
  password: Joi.string().required().min(6)
//   .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
});

const userSchema = new Schema({
  stripeId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

const UserModel = models.user || model("user", userSchema);

module.exports = { UserModel, userValidateSchema };
