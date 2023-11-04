import * as statisticController from "../../controllers/statistics.controller";
import express from "express";
const statisticRoute = express.Router();

statisticRoute.get("/best-seller", statisticController.getBestSellerProduct);

export default statisticRoute;
