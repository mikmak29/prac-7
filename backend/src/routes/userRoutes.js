import express from "express";
import * as userController from "../controllers/user.controller.js";

const route = express.Router();

route.route("/user").get(userController.fetchUsers).post(userController.createUser);
route.get("/user/:id", userController.findUser);
route.put("/user/:id", userController.updateUser);
route.delete("/user/:id", userController.deleteUser);

export default route;
