import * as commentController from "../../controllers/comment.controller";
import express from "express";

const commentRoute = express.Router();

commentRoute.post("/create", commentController.create);
commentRoute.post("/update/:id", commentController.update);
commentRoute.delete("/remove/:id", commentController.remove);
commentRoute.get("/:id", commentController.getByProductId);

export default commentRoute;
