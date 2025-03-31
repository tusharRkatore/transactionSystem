const express = require('express');
const categoryRoute = express.Router();
const Product = require('../models/Product'); 

// Route to get category distribution based on the month
categoryRoute.get('/category-distribution', async (req, res) => {
  const month = req.query.month; // Get the month from query parameters
  
  if (!month) {
    return res.status(400).json({ message: 'Month parameter is required' });
  }

  try {
    console.log(month);
    // Find products based on the month, regardless of the year
    const products = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, parseInt(month)] // Extract month from saleDate
          }
        }
      },
      {
        $group: {
          _id: "$category", // Group by category
          count: { $sum: 1 } // Count the number of products in each category
        }
      }
    ]);

    const categoryDistribution = products.map(product => ({
      category: product._id,
      count: product.count
    }));

    res.json(categoryDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = categoryRoute;
