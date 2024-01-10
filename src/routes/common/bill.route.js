import * as billController from "../../controllers/bill.controller";
import express from "express";

const billRoute = express.Router();

billRoute.post("/create", billController.create);
billRoute.post("/update/:id", billController.update);
billRoute.put("/update-status/:id", billController.updateStatus);
billRoute.get("/", billController.read);
billRoute.get("/:id", billController.getByUserId);
billRoute.get("/by-id/:id", billController.getOne);
billRoute.get("/bill-detail/:id", billController.getBillDetailById);
billRoute.get("/bill-history/:id", billController.getBillHistoryByBillId);

export default billRoute;
