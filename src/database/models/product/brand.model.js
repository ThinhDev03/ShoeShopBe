import mongoose, { Schema } from "mongoose";

const BrandSchema = new Schema(
  {
    brand_name: {
      type: String,
      required: true,
      unique: true,
    },
    origin: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("brand", BrandSchema);
