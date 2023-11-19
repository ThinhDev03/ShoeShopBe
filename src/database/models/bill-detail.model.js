import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const OrderDetailSchema = new Schema(
  {
    bill_id: {
      type: mongoose.Types.ObjectId,
      ref: "bill",
      autopopulate: { select: "_id status" },
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "productDetail",
      required: true,
      autopopulate: { select: "_id product_id price name" },
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

export default mongoose.model("billDetail", OrderDetailSchema);
