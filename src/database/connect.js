import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = `mongodb://127.0.0.1:27017/shoeShop`

export const connectMongoDB = () => {
  mongoose.set("strictQuery", false);

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection is open to MongoDB Atlas");
  });

  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection is disconnected");
  });
};
