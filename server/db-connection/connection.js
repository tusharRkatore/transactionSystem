// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // <-- IMPORTANT: your Product model
const sampleData = require("../sampleData.json"); // <-- IMPORTANT: JSON file with your products

// Read MongoDB URI
const URI = process.env.MONGODB_URI;

// Validate URI
if (!URI) {
  console.error("❌ ERROR: MONGODB_URI missing in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");

    // ---------------------------
    // 🔥 AUTO-SEED IF EMPTY
    // ---------------------------
    const count = await Product.countDocuments();

    if (count === 0) {
      console.log("📦 No products found. Seeding sample data...");
      await Product.insertMany(sampleData);
      console.log("✅ Sample data inserted successfully!");
    } else {
      console.log(`📦 Products already exist: ${count} records found.`);
    }
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
