import * as productController from "../../controllers/product/product.controller";
import express from "express";
const productRoute = express.Router();

productRoute.post("/create", productController.create);
productRoute.post("/update/:id", productController.update);
productRoute.delete("/remove/:id", productController.remove);
productRoute.get("/", productController.read);
productRoute.get("/:id", productController.getBuyId);
productRoute.get("/images/:id", productController.getImageByProduct);

//detail
productRoute.post("/create-detail", productController.createDetail);
productRoute.post("/update-detail", productController.updateDetailById);
productRoute.get("/detail/:id", productController.getDetailById);
productRoute.delete("/remove-detail/:id", productController.removeDetail);

export default productRoute;
