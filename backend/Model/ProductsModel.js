import mongoose, { Schema, Model } from "mongoose";

const ProductSchema = new Schema({
  productName: {
    type: String,
    unique: true,
    required: true,
  },
  productSizes: {
    type: Map,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
