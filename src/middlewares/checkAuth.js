import jwt from "jsonwebtoken";
import UserSchema from "../database/models/user.model";

const checkAuth = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existUser = await UserSchema.findOne({ username });
    if (!existUser) {
      return res.status(400).json({ message: "username not found" });
    }

    if (!existUser.authenticate(password)) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = await jwt.sign({ ...existUser }, process.env.SECRETKEY, {
      // set time refesh token
      // expiresIn: 10,
    });
    existUser.password = "";
    const { password: _, ...userInfo } = existUser._doc;
    return res
      .status(200)
      .json({ message: "Login success", token, user: userInfo });
  } catch (error) {
    return res.status(400).json({ message: "Login failed", error });
  }
  next();
};

export default checkAuth;
