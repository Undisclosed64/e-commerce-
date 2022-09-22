const Product = require("../models/product");

exports.createProduct = (req, res) => {
  // const product = new Product({
  //   name: req.body.name,
  //   brandName: req.body.brandName,
  //   description: req.body.desc,
  //   rating: req.body.rating,
  //   quantity: req.body.quantity,
  // });
  const product = new Product(req.body);

  try {
    product.save((err, createdProduct) => {
      if (err) return res.json(err);
      return res.json({
        createdProduct,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//find products handler
exports.retrieveProducts = (req, res) => {
  Product.find(
    { name: { $regex: req.query.name, $options: "i" } },
    (err, products) => {
      if (err) res.status(500).json(err);
      res.json(products);
    }
  );
};

exports.getProducts = (req, res) => {
  Product.find((err, products) => {
    if (err) res.status(500).json(err);
    res.json(products);
  });
};
