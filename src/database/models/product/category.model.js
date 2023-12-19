import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    is_locked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", CategorySchema);
