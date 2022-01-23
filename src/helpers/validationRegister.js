module.exports = {
	email: {
		isEmail: {
			bail: true,
			errorMessage: "email is required",
		},
	},
	password: {
		isLength: {
			errorMessage: "Passwords length must be 8 digit",
			options: {
				min: 8,
			},
		},
	},
};