
const express = require('express');
const priceRoute = express.Router();
const Product = require('../models/Product');

// Route to get the price distribution based on the month
priceRoute.get('/price-distribution', async (req, res) => {
  const month = req.query.month; // Get the month from query parameters
  
  if (!month) {
    return res.status(400).json({ message: 'Month parameter is required' });
  }

  // Convert month to an integer
  const monthNumber = parseInt(month);

  try {
    
    const products = await Product.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber] // Extract month from saleDate
      }
    });

    console.log(products);

    const priceRanges = {
      '0 - 100': 0,
      '101 - 200': 0,
      '201 - 300': 0,
      '301 - 400': 0,
      '401 - 500': 0,
      '501 - 600': 0,
      '601 - 700': 0,
      '701 - 800': 0,
      '801 - 900': 0,
      '901++': 0
    };

    products.forEach(product => {
      const price = product.price;

      if (price >= 0 && price <= 100) {
        priceRanges['0 - 100']++;
      } else if (price >= 101 && price <= 200) {
        priceRanges['101 - 200']++;
      } else if (price >= 201 && price <= 300) {
        priceRanges['201 - 300']++;
      } else if (price >= 301 && price <= 400) {
        priceRanges['301 - 400']++;
      } else if (price >= 401 && price <= 500) {
        priceRanges['401 - 500']++;
      } else if (price >= 501 && price <= 600) {
        priceRanges['501 - 600']++;
      } else if (price >= 601 && price <= 700) {
        priceRanges['601 - 700']++;
      } else if (price >= 701 && price <= 800) {
        priceRanges['701 - 800']++;
      } else if (price >= 801 && price <= 900) {
        priceRanges['801 - 900']++;
      } else if (price >= 901) {
        priceRanges['901++']++;
      }
    });

    console.log(priceRanges);
    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = priceRoute;
