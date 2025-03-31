const express = require("express");
const statRoute = express.Router();
const Product = require("../models/Product");

// GET statistics for a selected month regardless of year
statRoute.get("/statistics/:month", async (req, res) => {
  try {
    const month = parseInt(req.params.month); // Get the month from params (1-12)

    // Query to find sold products for the selected month (regardless of the year)
    const soldItems = await Product.find({
      sold: true,
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, month],
      },
    });

    // Find products that are not sold
    const notSoldItems = await Product.find({
      sold: false,
    });

    // Calculate the total sale amount
    const totalSaleAmount = soldItems.reduce(
      (sum, product) => sum + product.price,
      0
    );
    console.log(totalSaleAmount);

    res.json({
      totalSaleAmount: totalSaleAmount,
      totalSoldItems: soldItems.length,
      totalNotSoldItems: notSoldItems.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics" });
  }
});

module.exports = statRoute;
