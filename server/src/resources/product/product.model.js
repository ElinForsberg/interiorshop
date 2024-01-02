const {Schema, model, models} = require('mongoose');
const Joi = require("joi");

const productValidateSchema = Joi.object({
    _id: Joi.string(),
    stripeId: Joi.string(),
    title: Joi.string().required(),
    inStock: Joi.number().integer().required(),
  });

const ProductSchema = new Schema({
    title: {type:String, required:true},
    stripeId: {type:String, required: true},
    inStock: {type:Number, required:true},
},{versionKey:false});


const ProductModel = models.product || model('product', ProductSchema);
module.exports = { ProductModel, productValidateSchema };

