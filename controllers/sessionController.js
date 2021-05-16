const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const saltRounds = 12;

module.exports = {
	createUser: async (req, res) => {
		const db = req.app.get("db");
		let { email, firstName, lastName, password, username } = req.body;
		const lowerCaseEmail = email.toLowerCase();
		const lowerCaseUsername = username.toLowerCase();
		const [user] = await db.user.get_user_by_email(lowerCaseEmail);
		const [usernameCheck] = await db.user.get_user_by_username(
			lowerCaseUsername
		);

		if (user || usernameCheck) {
			res.status(200).send({
				username: typeof usernameCheck === "object",
				email: typeof user === "object",
			});
		} else {
			const stripeCustomer = await stripe.customers.create({
				email: email,
				name: `${firstName} ${lastName}`,
				metadata: { Username: username },
			});

			const salt = await bcrypt.genSalt(saltRounds);
			const hash = await bcrypt.hash(password, salt);

			const date = `${new Date().getFullYear()}-${
				new Date().getMonth() + 1
			}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`;

			const [saveUser] = await db.user.insert_user([
				firstName,
				lastName,
				date,
				null,
				stripeCustomer.id,
				hash,
				email,
				username,
			]);
			const userObj = {
				firstName: saveUser.first_name,
				lastName: saveUser.last_name,
				createdAt: saveUser.created_at,
				profilePic: saveUser.profile_pic,
				stripeId: saveUser.stripe_id,
				email: saveUser.email,
				userId: saveUser.id,
				username: username,
				connectedAccount: user.connected_account_id,
			};

			res.status(200).send(userObj);
		}
	},
	loginUser: async (req, res) => {
		const db = req.app.get("db");
		const { username, password } = req.body;
		const lowerCaseUsername = username.toLowerCase();

		const [user] = await db.user.get_user_by_username(lowerCaseUsername);

		if (!user) {
			res.status(401).send("Incorrect Username or Password");
		} else {
			const result = await bcrypt.compare(password, user.password);
			if (result) {
				const userObj = {
					firstName: user.first_name,
					lastName: user.last_name,
					createdAt: user.created_at,
					profilePic: user.profile_pic,
					stripeId: user.stripe_id,
					email: user.email,
					userId: user.id,
					username: user.username,
					connectedAccount: user.connected_account_id,
				};
				res.status(200).send(userObj);
			} else {
				res.status(401).send("Incorrect Username or Password");
			}
		}
	},
};
