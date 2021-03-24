const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
	createConnectedAccount: async (req, res) => {
		const db = req.app.get("db");

		const account = await stripe.accounts.create({
			country: "US",
			type: "custom",
			email: "email@email.com",

			capabilities: {
				card_payments: {
					requested: true,
				},
				transfers: {
					requested: true,
				},
			},
			business_type: "individual",

			// company: {
			// 	address: {
			// 		city: "Vineyard",
			// 		state: "Utah",
			// 		country: "US",
			// 		line1: "329 n 680 e",
			// 		line2: null,
			// 		postal_code: "84059",
			// 	},
			// },
			individual: {
				first_name: "Cooper",
				last_name: "Holt",
				address: {
					city: "Vineyard",
					state: "Utah",
					country: "US",
					line1: "329 n 680 e",
					line2: null,
					postal_code: "84059",
				},
				id_number: "646266907",
				dob: { day: "01", year: "1901", month: "01" },
				email: "email@email.com",
				phone: "18016347706",
			},
			business_profile: {
				mcc: "4812",
				url: "https://in-session-web.vercel.app/",
			},
			default_currency: "usd",
			external_account: {
				object: "bank_account",
				country: "US",
				currency: "usd",
				routing_number: "110000000",
				account_number: "000123456789",
			},

			tos_acceptance: {
				date: Math.floor(Date.now() / 1000),
				ip: req.ip,
			},
		});

		if (account.account) {
			const user = await db.user.insert_connect_account_id(account.account);

			const userObj = {
				firstName: user.first_name,
				lastName: user.last_name,
				createdAt: user.created_at,
				profilePic: user.profile_pic,
				stripeId: user.stripe_id,
				email: user.email,
				username: user.username,
				connectedAccount: user.connected_account_id,
			};
			res.status(200).send(userObj);
		} else {
			res.status(400).send(account);
		}
	},
	createCardForPurchases: async (req, res) => {
		const { cardDetails, stripeId } = req.body;
		const card = await stripe.customers.createSource(stripeId, {
			source: "tok_visa",
			//  {
			// 	object: "card",
			// 	number: "4242424242424242",
			// 	exp_month: "12",
			// 	exp_year: "2025",
			// 	cvc: "424",
			// },
		});
		console.log(card);
		res.status(200).send("Card Added");
	},
};
