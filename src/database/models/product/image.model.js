import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      autopopulate: { select: "_id name" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("image", ImageSchema);
