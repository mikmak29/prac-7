export const globalErrorHandler = (err, req, res, next) => {
	const statusCode = err.status || err.statusCode || 500;
	const errorFound = {
		status: statusCode,
		message: err.message,
		errorStack: err.stack,
	};

	res.status(statusCode).send(errorFound);
};
