const express = require('express');
const userRouter = express.Router();
const { userValidateSchema } = require('./user.model');
const { registerUser } = require('./user.controller')
const {validate} = require('../middlewares')

userRouter.post("/register",validate(userValidateSchema),registerUser)


module.exports = { userRouter };