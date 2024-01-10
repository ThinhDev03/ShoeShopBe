import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const OrderHistorySchema = new Schema(
    {
        bill_id: {
            type: mongoose.Types.ObjectId,
            ref: "bill",
            autopopulate: { select: "_id status" },
            required: true,
        },
        user_updated: {
            type: mongoose.Types.ObjectId,
            ref: "users",
            autopopulate: { select: "_id fullname role" },
        },
        bill_status: {
            type: String,
            enum: ["PENDING", "PACKING", "TRANSPORT", "RECEIVED", "CANCELED"],
            required: true,
        },
        payment_status: {
            type: String,
            enum: ["PAID", "UNPAID"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

OrderHistorySchema.plugin(mongooseAutoPopulate);

export default mongoose.model("billHistory", OrderHistorySchema);
