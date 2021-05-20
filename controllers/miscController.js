const awsFunctions = require("../functions/awsFunctions");

module.exports = {
	getPhoto: async (req, res) => {
		const { key } = req.query;
		let base64 = await awsFunctions.getImageAWS(key);
		res.status(200).send(base64);
	},
};
