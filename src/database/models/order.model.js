import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      autopopulate: { select: "_id" },
    },
    address: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("order", OrderSchema);
