import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";

import connectDB from "./config/userDB.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3001;

const serverStarter = asyncErrorHandler(async () => {
	await connectDB();

	app.listen(port, () => {
		console.log(`Server running at port ${port}`);
	});
});

serverStarter();
