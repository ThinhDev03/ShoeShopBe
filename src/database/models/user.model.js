import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "EMPLOYEE"],
      default: "USER",
    },
    gender: {
      enum: ["MAN", "FEMAN"],
      type: String,
    },
    is_locked: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.password = this.bcryptPassword(this.password);
  next();
});

UserSchema.methods = {
  bcryptPassword(password) {
    if (!password) return "";
    return bcrypt.hashSync(password, 10);
  },
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

export default mongoose.model("users", UserSchema);
