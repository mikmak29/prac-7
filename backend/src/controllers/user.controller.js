import asyncErrorHandler from "express-async-handler";
import * as userServices from "../services/user.services.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";
import { validateObjectId } from "../helper/validateObjectId.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	// const name = req.query.name;
	// const status = req.query.status;

	const users = await userServices.fetchUsers();
	res.status(200).json(users);
});

export const findUser = asyncErrorHandler(async (req, res) => {
	const id = req.params.id;

	if (!id) {
		conditionalErrorHandler("Id parameter is required.", 400);
	}

	validateObjectId(id, "Invalid id format", 400);

	const user = await userServices.findUser(id);

	if (!user) {
		conditionalErrorHandler(`User with id: ${id} not found`, 404);
	}

	res.status(200).send({
		Found_User: user,
	});
});

export const createUser = asyncErrorHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		conditionalErrorHandler("Fields are mandatory to filled.", 404);
	}

	const isUserExist = await userServices.checkUserExists({ name });

	if (isUserExist) {
		conditionalErrorHandler("User already exist.", 404);
	}

	const user = await userServices.createUser({ name });

	res.status(201).send({
		status: 201,
		method: "POST",
		data: {
			user,
		},
	});
});

export const updateUser = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		conditionalErrorHandler("Id parameter is required.", 400);
	}

	validateObjectId(id, "Invalid id format", 400);

	const user = await userServices.updateUser(id, req.body, true);

	if (!user) {
		conditionalErrorHandler(`User with id: ${id} not found`, 404);
	}

	res.status(200).send({
		Updated_user: user,
	});
});

export const deleteUser = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	if (!id) {
		conditionalErrorHandler("Id parameter is required.", 400);
	}

	validateObjectId(id, "Invalid id format", 400);

	const user = await userServices.deleteUser(id);

	if (!user) {
		conditionalErrorHandler(`User with id: ${id} not found`, 404);
	}

	setTimeout(() => {
		res.status(200).send({
			Deleted_User: user,
		});
	}, 3000);
});
