const cors = require("cors");
const express = require("express");
const app = express();
const connection = require("./db-connection/connection");
const router = require("./routes/router");
const allTransactionRoute = require("./routes/all-transactions");

const statRoute = require("./routes/fetch-statistics");
const priceRoute = require("./routes/price-range-statistics");
const categoryRoute = require("./routes/category-distribution");
const transactionRoute = require("./routes/combine-data-route");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(cors(
        {
          origin:{"https://transaction-system-two.vercel.app"},
          method:{"POST","GET"},
          credentials: true
        }
  ));
app.use(express.json());
mongoose.connect('mongodb+srv://tusharkatore2019:6fUbIaXgBiCy0uQN@cluster1.kq70g.mongodb.net/transaction?retryWrites=true&w=majority&appName=Cluster1');

app.get("/",(req,res) =>{
  res.json("hello");
});

app.use("/", router);
app.use("/", allTransactionRoute);
app.use("/", statRoute);
app.use("/", priceRoute);
app.use("/", categoryRoute);
app.use("/", transactionRoute);

connection()
  .then(() => {
    console.log("Your database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5008, () => {
  console.log("You have created server successfully");
}); 





