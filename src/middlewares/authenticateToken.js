import jwt from "jsonwebtoken";
import UserSchema from "../database/models/user.model";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(400).json({ message: "token is required" });
      return;
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null || !token) {
      return res.status(400);
    }

    jwt.verify(token, process.env.SECRETKEY, async (err, user) => {
      if (err) {
        return res.status(400).json({ message: "token wrong" });
      }
      const getUser = user._doc;
      
      const dataGetDB = await UserSchema.findOne({ _id: getUser._id });
      
      const { password, ...data } = dataGetDB._doc;

      return res.status(200).json({ data });
    });
  } catch (error) {
    console.log("error here", error);
    return res.status(400).json({ message: "token wrong" });
  }
  next();
};

export default verifyToken;
