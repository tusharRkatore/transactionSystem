const mongoose = require("mongoose");

// Define the Product Schema
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },

  // Updated Image Field with Fallback
  image: {
    type: String,
    required: false,
    default: "https://via.placeholder.com/150", // fallback image
  },

  sold: { type: Boolean, required: true },

  dateOfSale: { type: Date, required: true },
});

// Create the model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
