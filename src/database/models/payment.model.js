import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PaymentSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("payment", PaymentSchema);
