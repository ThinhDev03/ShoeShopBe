import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    max_sale: {
      type: Number,
    },
    brand_id: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      required: true,
      autopopulate: { select: "brand_name" },
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
      autopopulate: { select: "category_name" },
    },
    thumbnail: {
      type: String,
    },
    fromPrice: {
      type: String,
    },
    toPrice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("product", ProductSchema);
