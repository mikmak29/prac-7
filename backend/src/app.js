import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import express from "express";

import userRoutes from "./routes/userRoutes.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

const app = express();

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(compression());
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

export default app;
