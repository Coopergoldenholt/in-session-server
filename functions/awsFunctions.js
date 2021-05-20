const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
AWS.config = {
	accessKeyId: process.env.S3_BUCKET_ID,
	secretAccessKey: process.env.S3_BUCKET_SECRET,
};
var s3 = new AWS.S3();
module.exports = {
	postImageAWS: async (userId, base64) => {
		const type = base64.split(";")[0].split("/")[1];

		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: `${userId}/${uuidv4()}`,
			Body: base64,
			ContentEncoding: "base64",
			ContentType: `image/${type}`,
		};
		let newKey = "";
		try {
			const { key } = await s3.upload(params).promise();
			newKey = key;
		} catch (error) {
			console.log(error);
		}

		return newKey;
	},
	getImageAWS: async (key) => {
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: `${key}`,
		};
		try {
			const { Body } = await s3.getObject(params).promise();
			return Body;
		} catch (error) {
			console.log(error);
		}
	},
};
