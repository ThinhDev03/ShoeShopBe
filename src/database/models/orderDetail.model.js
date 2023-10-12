import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const OrderDetailSchema = new Schema(
  {
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: "order",
      autopopulate: { select: "_id" },
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      autopopulate: { select: "_id" },
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

OrderDetailSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("orderDetail", OrderDetailSchema);
