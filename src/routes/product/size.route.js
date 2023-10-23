import * as sizeController from "../../controllers/product/size.controller";
import express from "express";
const sizeRoute = express.Router();

sizeRoute.post("/create", sizeController.create);
sizeRoute.post("/update/:id", sizeController.update);
sizeRoute.delete("/remove/:id", sizeController.remove);
sizeRoute.get("/", sizeController.read);

export default sizeRoute;
