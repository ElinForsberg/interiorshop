const express = require('express');
const userRouter = express.Router();
const { userValidateSchema } = require('./user.model');
const { registerUser, loginUser, logoutUser } = require('./user.controller')
const {validate} = require('../middlewares')

userRouter.post("/user/register",validate(userValidateSchema),registerUser)
userRouter.post("/user/login", validate(userValidateSchema), loginUser)
userRouter.post("/user/logout", logoutUser)

module.exports = { userRouter };