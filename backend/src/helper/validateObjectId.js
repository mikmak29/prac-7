import mongoose from "mongoose";
import { conditionalErrorHandler } from "./conditionalErrorHandler.js";

export const validateObjectId = (id, message, statusCode) => {
	!mongoose.Types.ObjectId.isValid(id) ? conditionalErrorHandler(`${message}: ${id}`, statusCode) : null;
};
