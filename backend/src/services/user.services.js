import User from "../models/UserModel.js";

export const fetchUsers = async () => {
	return await User.find();
};

export const findUser = async (data) => {
	return await User.findById(data);
};

export const checkUserExists = async (name) => {
	return await User.findOne(name);
};

export const createUser = async (data) => {
	return await User.create(data);
};

export const updateUser = async (id, body, boolean) => {
	return await User.findByIdAndUpdate(id, body, { new: boolean });
};

export const deleteUser = async (id) => {
	return await User.findByIdAndDelete(id);
};
