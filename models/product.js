const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String, required: false },
  rating: { type: Number, required: false },
  quantity: { type: Number, required: false },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Product", productSchema);
