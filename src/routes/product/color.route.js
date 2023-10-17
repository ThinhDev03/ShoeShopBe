import * as colorController from "../../controllers/product/color.controller";
import express from "express";
const colorRoute = express.Router();

colorRoute.post("/create", colorController.create);
colorRoute.post("/update/:id", colorController.update);
colorRoute.delete("/remove/:id", colorController.remove);
colorRoute.get("/", colorController.read);

export default colorRoute;
