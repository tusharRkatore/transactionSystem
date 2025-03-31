const express=require('express');
const transactionRoute=express.Router();

transactionRoute.get('/combined-data', async (req, res) => {
    const { month} = req.query; // All query parameters for APIs
  
    try {
      // Fetch data from the individual APIs
      const [transactionsRes, statisticsRes, priceDistributionRes, categoryDistributionRes] = await Promise.all([
        fetch(`http://localhost:5008/all-transactions`).then(res => res.json()),
        fetch(`http://localhost:5008/statistics?month=${month}`).then(res => res.json()),
        fetch(`http://localhost:5008/price-distribution?month=${month}`).then(res => res.json()),
        fetch(`http://localhost:5008/category-distribution?month=${month}`).then(res => res.json())
      ]);
  
      // Combine all results into a single JSON response
      res.json({
        transactions: transactionsRes,
        statistics: statisticsRes,
        priceDistribution: priceDistributionRes,
        categoryDistribution: categoryDistributionRes
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  module.exports = transactionRoute;
  