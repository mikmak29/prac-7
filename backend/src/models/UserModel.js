import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const usersSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			default: uuidv4(),
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model.User || mongoose.model("User", usersSchema, "prac7_users");
