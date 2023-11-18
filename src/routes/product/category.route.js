import * as categoryController from "../../controllers/product/category.controller";
import express from "express";
const categoryRoute = express.Router();

categoryRoute.post("/create", categoryController.create);

categoryRoute.post("/update/:id", categoryController.update);

categoryRoute.delete("/remove/:id", categoryController.remove);

categoryRoute.get("/:id", categoryController.findOne);

categoryRoute.get("/", categoryController.read);

export default categoryRoute;
