import asyncErrorHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	// const name = req.query.name;
	// const status = req.query.status;

	const data = await User.find();
	res.status(200).json(data);
});

export const findUser = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id);

	res.status(200).send({
		Found_User: user,
	});
});

export const createUser = asyncErrorHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		conditionalErrorHandler("Fields are mandatory to filled.", 404);
	}

	const isUserExist = await User.findOne({ name });

	if (isUserExist) {
		conditionalErrorHandler("User already exist.", 404);
	}

	const createUser = await User.create({
		name,
	});

	res.status(201).send({
		status: 201,
		method: "POST",
		data: {
			createUser,
		},
	});
});
