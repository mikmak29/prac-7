import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
	{
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
