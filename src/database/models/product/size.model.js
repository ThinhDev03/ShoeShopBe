import mongoose, { Schema } from "mongoose";

const SizeSchema = new Schema(
  {
    size_name: {
      type: Number,
      required: true,
      unique:true
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

export default mongoose.model("size", SizeSchema);
