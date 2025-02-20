import mongoose, { Schema, Model } from "mongoose";

const SizeSchema = new Schema({
  sizeName: {
    type: String,
    unique: true,
    required: true,
  },
});

const SizesModel = mongoose.model("Size", SizeSchema);
export default SizesModel;
