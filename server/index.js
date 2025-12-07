require("dotenv").config(); // Load .env first
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const authRoute = require("./routes/auth");

const router = require("./routes/router");
const allTransactionRoute = require("./routes/all-transactions");
const statRoute = require("./routes/fetch-statistics");
const priceRoute = require("./routes/price-range-statistics");
const categoryRoute = require("./routes/category-distribution");
const transactionRoute = require("./routes/combine-data-route");

// CORS config
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  })
);

// ----------------------
// ✅ MongoDB Connection
// ----------------------
const URI = process.env.MONGODB_URI;

if (!URI) {
  console.log("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.log("❌ DB error:", err);
    process.exit(1);
  });

// ----------------------
// Routes
// ----------------------
app.use("/", authRoute);
app.use("/", router);
app.use("/", allTransactionRoute);
app.use("/", statRoute);
app.use("/", priceRoute);
app.use("/", categoryRoute);
app.use("/", transactionRoute);

// ----------------------
// Start Server
// ----------------------
app.listen(5008, () => {
  console.log("🚀 Server running on port 5008");
});
