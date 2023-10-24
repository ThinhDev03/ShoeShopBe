import * as cartController from "../../controllers/cart.controller";
import express from "express";
const cartRoute = express.Router();

cartRoute.post("/create", cartController.create);
cartRoute.post("/update/:id", cartController.update);
cartRoute.delete("/remove/:id", cartController.remove);
cartRoute.get("/:id", cartController.getByUserId);

export default cartRoute;
