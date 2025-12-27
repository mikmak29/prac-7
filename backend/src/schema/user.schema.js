import * as Yup from "yup";
import { USER } from "../constant/userChar.js";

const {
	USER_NAME_LENGTH: { NAME_MIN, NAME_MAX },
	USER_EMAIL_LENGTH: { EMAIL_MIN, EMAIL_MAX },
	USER_PASSWORD_LENGTH: { PASSWORD_MIN, PASSWORD_MAX },
} = USER;

export const postUser = {
	schema: {
		body: {
			yupSchema: Yup.object().shape({
				name: Yup.string().required("NamePath").min(NAME_MIN).max(NAME_MAX),
				email: Yup.string()
					.required("EmailPath")
					.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format.")
					.min(EMAIL_MIN)
					.max(EMAIL_MAX),
				password: Yup.string().required("PasswordPath").min(PASSWORD_MIN).max(PASSWORD_MAX),
			}),
		},
	},
	errorMessages: {
		NamePath: {
			message: "Name is required",
		},
		EmailPath: {
			message: "Email is required",
		},
		PasswordPath: {
			message: "Password is required.",
		},
	},
};
