const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSingleSchema = new Schema({
  title: { type: String },
  imgCollection: { type: Array },
});

module.exports = mongoose.model("ProductSingle", productSingleSchema);
