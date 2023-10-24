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
    brand_id: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      autopopulate: { select: "brand_name" },
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      autopopulate: { select: "category_name" },
    },
    thumbnail: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("product", ProductSchema);
