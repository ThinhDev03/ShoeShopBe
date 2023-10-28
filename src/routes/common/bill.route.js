import * as billController from "../../controllers/bill.controller";
import express from "express";
const billRoute = express.Router();

billRoute.post("/create", billController.create);
billRoute.post("/update/:id", billController.update);
billRoute.get("/", billController.read);
billRoute.get("/:id", billController.getByUserId);
billRoute.get("/bill-detail/:id", billController.getBillDetailById);

export default billRoute;
