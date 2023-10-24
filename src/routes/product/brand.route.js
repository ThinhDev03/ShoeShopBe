import * as brandController from "../../controllers/product/brand.controller";
import express from "express";
const brandRoute = express.Router();

brandRoute.post("/create", brandController.create);
brandRoute.post("/update/:id", brandController.update);
brandRoute.delete("/remove/:id", brandController.remove);
brandRoute.get("/:id", brandController.findOne);
brandRoute.get("/", brandController.read);

export default brandRoute;
