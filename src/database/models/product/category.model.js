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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", CategorySchema);
