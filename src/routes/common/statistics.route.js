import * as statisticController from "../../controllers/statistics.controller";
import express from "express";
const statisticRoute = express.Router();

statisticRoute.get("/best-seller", statisticController.getBestSellerProduct);
statisticRoute.get("/revenue", statisticController.getRevenue);
statisticRoute.get("/top-rate", statisticController.getTopRate);
statisticRoute.get("/revenue-year", statisticController.getRevenueWithYear);
statisticRoute.get("/revenue-all", statisticController.getAllRevenue);

export default statisticRoute;
