const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
	createConnectedAccount: async (req, res) => {
		const account = await stripe.accounts.create({
			country: "US",
			type: "custom",
			capabilities: {
				card_payments: {
					requested: true,
				},
				transfers: {
					requested: true,
				},
			},
		});

		const accountLinks = await stripe.accountLinks.create({
			account: account.id,
			refresh_url: "https://example.com/reauth",
			return_url: "https://example.com/return",
			type: "account_onboarding",
			collect: "eventually_due",
		});
		console.log(accountLinks);
	},
	createCardForPurchases: async (req, res) => {
		const card = await stripe.customers.createSource(req.session.customer_id, {
			source: "tok_visa",
		});
	},
};
