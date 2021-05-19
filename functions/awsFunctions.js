const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config = {
	accessKeyId: process.env.S3_BUCKET_ID,
	secretAccessKey: process.env.S3_BUCKET_SECRET,
};
var s3 = new AWS.S3();
module.exports = {
	postImageAWS: async (userId, base64) => {
		let location = "";
		const base64Data = new Buffer.from(
			base64.replace(/^data:image\/\w+;base64,/, ""),
			"base64"
		);
		const type = base64.split(";")[0].split("/")[1];
		let key = `${userId}/${uuidv4()}`;
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: `${userId}/${uuidv4()}`,
			Body: base64Data,
			ContentEncoding: "base64",
			ContentType: `image/${type}`,
		};

		try {
			s3.upload(params).promise();
		} catch (error) {
			console.log(error);
		}

		return key;
	},
	getImageAWS: async (key) => {
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: key,
		};

		try {
			const { Body } = await s3.getObject(params).promise();
			const imageBuffer = Buffer.from(JSON.stringify(Body));
			const imageBase64 = imageBuffer.toString("base64");
			return imageBase64;
		} catch (error) {
			console.log(error);
		}
	},
};
