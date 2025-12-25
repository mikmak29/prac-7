import express from "express";
import * as userController from "../controllers/user.controller.js";

const route = express.Router();

route.route("/user").get(userController.fetchUsers).post(userController.createUser);
route.get("/user/:id", userController.findUser);

export default route;
