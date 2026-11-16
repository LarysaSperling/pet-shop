require("dotenv").config();
const express = require("express");
const cors = require("cors");

const categories = require("./routes/categories");
const sale = require("./routes/sale");
const order = require("./routes/order");
const products = require("./routes/products");

const sequelize = require("./database/database");
const Category = require("./database/models/category");
const Product = require("./database/models/product");

const PORT = process.env.PORT || 3333;

Category.hasMany(Product);

const app = express();

app.get("/", (req, res) => {
  res.send("Pet Shop API is running");
});

app.use(express.static("public"));

// Allowed frontend origins, comma-separated in CORS_ORIGINS (see .env.example)
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "https://pet-shop-roan-five.vercel.app,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/categories", categories);
app.use("/products", products);
app.use("/sale", sale);
app.use("/order", order);

const start = async () => {
  try {
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

// app.listen('3333');