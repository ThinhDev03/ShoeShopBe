import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const CartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      autopopulate: { select: "_id" },
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "productDetail",
      autopopulate: { select: "_id price product_id" },
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


CartSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("cart", CartSchema);
