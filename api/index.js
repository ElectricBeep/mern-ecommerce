const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const wishlistRoute = require("./routes/wishlist");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/checkout", stripeRoute);

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});