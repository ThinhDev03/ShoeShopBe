import mongoose, { Schema } from "mongoose";

const ColorSchema = new Schema(
  {
    color_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("color", ColorSchema);
