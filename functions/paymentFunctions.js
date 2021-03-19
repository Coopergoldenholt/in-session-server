const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const privatePurchase = async (userPayment, inSessionFee, accountID) => {
	await stripe.paymentIntents.create({
		payment_method_types: ["card"],
		amount: 1000,
		currency: "usd",
		application_fee_amount: 200,
		transfer_data: {
			destination: accountID,
		},
	});
};
