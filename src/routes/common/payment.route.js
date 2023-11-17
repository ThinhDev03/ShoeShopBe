import * as paymentController from "../../controllers/payment.controller";
import express from "express";

const paymentRoute = express.Router();

paymentRoute.post("/", paymentController.createPayment);

export default paymentRoute;
