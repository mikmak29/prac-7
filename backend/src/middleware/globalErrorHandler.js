export const globalErrorHandler = (err, req, res, next) => {
	const statusCode = err.status || err.statusCode || 500;

	// express-yup-middleware maps errorMessages from schema to err.message
	// The custom message from errorMessages.NamePath.message should be in err.message
	// However, for validation errors, check multiple possible locations
	let message = err.message || "Internal Server Error";

	// For validation errors (400), check if there are multiple errors in err.errors array
	if (statusCode === 400 && err.errors && Array.isArray(err.errors)) {
		// Multiple validation errors - join them
		message = err.errors.map((e) => e.message || e).join(", ");
	} else if (statusCode === 400 && err.inner && Array.isArray(err.inner) && err.inner.length > 0) {
		// Yup's internal error structure - extract messages
		message = err.inner.map((e) => e.message).join(", ");
	}

	const errorFound = {
		status: statusCode,
		message: message,
		errorStack: err.stack,
	};

	res.status(statusCode).send(errorFound);
};
