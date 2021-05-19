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

		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: `${userId}/${uuidv4()}`,
			Body: base64Data,
			ContentEncoding: "base64",
			ContentType: `image/${type}`,
		};
		let imageData = null;
		try {
			const { Location } = await s3.upload(params).promise();
			location = Location;
		} catch (error) {
			console.log(error);
		}

		return location;
	},
	getImageAWS: async (photoURI) => {
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: "3/c7cab229-03bb-4b43-8a34-5385755c51f1",
		};
		console.log("hello");
		try {
			await s3.getObject(params).then((res) => console.log(res));
			//   .promise();
			location = Location;
		} catch (error) {
			console.log(error);
		}
	},
};
