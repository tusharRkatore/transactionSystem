const express = require("express");
const allTransactionRoute = express.Router();
const Product = require("../models/Product");

// GET statistics for a selected month regardless of year
allTransactionRoute.get("/all-transactions", async (req, res) => {
  try {
    const data = await Product.find(); // Await the query execution
    res.json(data); // Send the fetched data directly
  } catch (err) {
    res.status(500).json({ msg: "Error fetching data" }); // Return proper error
  }
});

module.exports = allTransactionRoute;