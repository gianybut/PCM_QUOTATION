import mongoose, { Schema, Model } from "mongoose";

const ProductSchema = new Schema({
  productName: {
    type: String,
    unique: true,
    required: true,
  },
  productType: {
    type: String,
    enum: [
      "PERFUME",
      "CAR DIFFUSER",
      "ALCOHOL",
      "DISH WASHER",
      "COLOGNE",
      "FABRIC CONDITIONER",
      "HAND SOAP",
      "MISCELLANEOUS",
    ],
    required: true,
  }
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
