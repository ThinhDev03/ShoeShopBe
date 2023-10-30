import express from "express";
import {
  login,
  register,
  authorization,
  getAll,
  update,
  lockUser,
  getOne,
} from "../../controllers/users.controller";
import verifyToken from "../../middlewares/authenticateToken";
import checkAuth from "../../middlewares/checkAuth";
import checkGoogle from "../../middlewares/checkGoogle";
const authRoute = express.Router();

authRoute.get("", getAll);
authRoute.get("/get-detail/:id", getOne);
authRoute.post("/register", register);
authRoute.post("/login", checkAuth, login);
authRoute.post("/google", checkGoogle, login);
authRoute.post("/update/:id", update);
authRoute.put("/lock/:id", lockUser);
authRoute.get("/verify-token", verifyToken, authorization);

export default authRoute;
