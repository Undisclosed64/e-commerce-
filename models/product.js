const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  description: { type: String },
  rating: { type: Number },
  quantity: { type: Number },
  images: [{type:String}],
});

module.exports = mongoose.model("Product", productSchema);
