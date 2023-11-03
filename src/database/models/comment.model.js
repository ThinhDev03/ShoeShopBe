import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const CommentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      autopopulate: { select: "_id fullname" },
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      autopopulate: { select: "_id name" },
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.plugin(mongooseAutoPopulate);



export default mongoose.model("comment", CommentSchema);
