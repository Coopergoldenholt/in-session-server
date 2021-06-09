const AWS = require("aws-sdk");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
AWS.config = {
	accessKeyId: process.env.S3_BUCKET_ID,
	secretAccessKey: process.env.S3_BUCKET_SECRET,
};
var s3 = new AWS.S3();
module.exports = {
	saveImage: async (image) => {
		try {
			const id = uuidv4();
			// to declare some path to store your converted image
			const path = "./images/" + id + ".jpeg";

			const imgdata = image;

			// to convert base64 format into random filename
			const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, "");

			fs.writeFileSync(path, base64Data, { encoding: "base64" });
			let url = `http://localhost:4327/${id}.jpeg`;
			return url;
		} catch (e) {
			console.log(e);
		}
	},
};
