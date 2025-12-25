import asyncErrorHandler from "express-async-handler";
import User from "../models/UserModel.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	// const name = req.query.name;
	// const status = req.query.status;

	const data = await User.find();
	res.status(200).json(data);
});

export const createUser = asyncErrorHandler(async (req, res) => {
	const { name } = req.body;

	const createUser = await User.create({ name });

	res.status(200).send("Created user: " + createUser);
});
