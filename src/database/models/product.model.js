import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("product", ProductSchema);
