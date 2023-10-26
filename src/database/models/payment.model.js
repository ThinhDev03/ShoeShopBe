import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PaymentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["PAID", "UNPAID"],
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["PAYMENT_ON_DELIVEY", "PAYMENT_IN_ADVANCE"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("payment", PaymentSchema);
