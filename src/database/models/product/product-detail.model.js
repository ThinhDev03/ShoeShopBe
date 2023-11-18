import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ProductSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      autopopulate: { select: "name" },
    },
    size_id: {
      type: mongoose.Types.ObjectId,
      ref: "size",
      autopopulate: { select: "size_name" },
      required: true,
    },
    color_id: {
      type: mongoose.Types.ObjectId,
      ref: "color",
      autopopulate: { select: "color_name color_code" },
      required: true,
    },
    image_id: {
      type: mongoose.Types.ObjectId,
      ref: "image",
      autopopulate: { select: "image_url" },
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sale: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("productDetail", ProductSchema);
