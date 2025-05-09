const express = require('express');
const router = express.Router();
const axios = require('axios');
const Product = require('../models/Product');

router.route('/initialize').get(async (req, res) => {
    try {
        
        const response = await axios('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        
    
        const products = response.data;

        // Insert the products data into the MongoDB database
        await Product.insertMany(products);

        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        console.error('Error seeding the database:', error.message);
        res.status(500).send('Error initializing database');
    }
});

module.exports = router;
