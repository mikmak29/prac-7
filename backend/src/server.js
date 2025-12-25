import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import asyncErrorHandler from "express-async-handler";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/userDB.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.use(globalErrorHandler);

const serverStarter = asyncErrorHandler(async () => {
	await connectDB();

	app.listen(port, () => {
		console.log(`Server running at port ${port}`);
	});
});

serverStarter();
