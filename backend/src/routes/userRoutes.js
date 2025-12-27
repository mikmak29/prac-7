import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import * as userController from "../controllers/user.controller.js";
import * as userSchema from "../schema/user.schema.js";

const route = express.Router();

route
	.route("/")
	.get(userController.fetchUsers)
	.post(expressYupMiddleware({ schemaValidator: userSchema.postUser }), userController.createUser);
route.route("/:id").get(userController.findUser).put(userController.updateUser).delete(userController.deleteUser);

export default route;
