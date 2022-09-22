const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/products", productController.createProduct);

router.get("/products", productController.getProducts);

module.exports = router;
