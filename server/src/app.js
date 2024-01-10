const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const {productRouter} = require("./resources/product/product.router");
const { userRouter } = require("./resources/user/user.router");
const { checkoutRouter } = require("./resources/checkout/checkout.router");
const { orderRouter } = require("./resources/order/order.router");

const app = express();
app.use(express.json());
const CLIENT_URL = "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", checkoutRouter);
app.use("/api", orderRouter);

app.use((req, res) => {
    console.log("!404!");
    res.status(404).json("Missing resource");
  });

  module.exports = { app };