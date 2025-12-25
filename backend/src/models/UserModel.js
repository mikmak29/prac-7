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
			required: [true, "Name is required."],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model.User || mongoose.model("User", usersSchema, "prac7_users");
