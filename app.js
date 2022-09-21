//import modules
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");

const PORT = 3000 || process.env.PORT;

//use modules
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//connect db
const mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//use routes
app.use("/api", productRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

module.exports = app;
