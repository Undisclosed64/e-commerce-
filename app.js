//import modules
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const PORT = 5000 || process.env.PORT;

//connect db
const mongodb = process.env.MONGODB_URI;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use routes
app.use("/api", productRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

module.exports = app;
