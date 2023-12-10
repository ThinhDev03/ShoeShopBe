import * as voucherController from "../../controllers/voucher.controller";
import express from "express";

const voucherRoute = express.Router();

voucherRoute.post("/create", voucherController.create);
voucherRoute.post("/update/:id", voucherController.update);
voucherRoute.delete("/remove/:id", voucherController.remove);
voucherRoute.get("/:id", voucherController.findOne);
voucherRoute.get("/", voucherController.read);

export default voucherRoute;
