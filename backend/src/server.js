import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	const query = req.query;
	console.log(query);
	res.status(200).send("running...");
});

const serverStarter = () => {
	try {
		app.listen(port, () => {
			console.log(`Server running at port ${port}`);
		});
	} catch (error) {
		throw new Error({ Error: error.message });
	}
};

serverStarter();
