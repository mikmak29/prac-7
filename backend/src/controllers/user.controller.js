import asyncErrorHandler from "express-async-handler";
import * as userServices from "../services/user.services.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";
import { validateObjectId } from "../helper/validateObjectId.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Object}
 */

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	const users = await userServices.fetchUsers();
	res.header("Cache-Control", "no-cache");
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
	const { name, email, password } = req.body;

	// Note: Validation is handled by express-yup-middleware before this controller
	// So we don't need to manually check if fields exist

	const isUserExist = await userServices.checkUserExists({ email });

	if (isUserExist) {
		conditionalErrorHandler("User with this email already exists.", 409);
	}

	const user = await userServices.createUser({ name, email, password });

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
