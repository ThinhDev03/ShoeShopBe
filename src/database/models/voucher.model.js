import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const VoucherSchema = new Schema(
  {
    discount: {
      type: String,
      required: true,
    },
    point_discount: {
      type: String,
      required: true,
    },
    voucher_name: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
    },
    end_date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

VoucherSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("voucher", VoucherSchema);
