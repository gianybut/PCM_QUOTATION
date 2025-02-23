import mongoose, { Schema, Model } from "mongoose";

const SizeSchema = new Schema({
  sizeName: {
    type: String,
    unique: true,
    required: true,
  },
  sizeFor: {
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
  },
});

const SizesModel = mongoose.model("Size", SizeSchema);
export default SizesModel;
