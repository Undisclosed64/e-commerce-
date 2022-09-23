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

const a = () => {
  app.use(express.static("uploads"));
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "./uploads"));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
      );
    },
  });
  const multi_upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        const err = new Error("Only .jpg .jpeg .png images are supported!");
        err.name = "ExtensionError";
        return cb(err);
      }
    },
  }).array("uploadImages", 10);
  app.post("/api/upload-multiple", (req, res) => {
    multi_upload(req, res, function (err) {
      console.log(req.files);
      //multer error
      if (err instanceof multer.MulterError) {
        console.log(err);
        res
          .status(500)
          .send({
            error: { msg: `multer uploading error: ${err.message}` },
          })
          .end();
        return;
      } else if (err) {
        //unknown error
        if (err.name == "ExtensionError") {
          res
            .status(413)
            .send({ error: { msg: `${err.message}` } })
            .end();
        } else {
          res
            .status(500)
            .send({ error: { msg: `unknown uploading error: ${err.message}` } })
            .end();
        }
        return;
      }
      res.status(200).send("file uploaded");
    });
  });
};
a();
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
