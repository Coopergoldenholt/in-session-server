const Mux = require("@mux/mux-node");
const axios = require("axios");
const awsFunctions = require("../functions/awsFunctions");

// assuming process.env.MUX_TOKEN_ID and process.env.MUX_TOKEN_SECRET
// contain your credentials
const { Video, Data } = new Mux(
	process.env.MUX_TOKEN_ID,
	process.env.MUX_TOKEN_SECRET
);

module.exports = {
	startLiveStream: async (req, res) => {
		// Create an asset
		console.log(Video.LiveStreams);
		const asset = await Video.Asset.create({
			input: "https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4",
		});
	},
	scheduleLiveStream: async (req, res) => {
		const db = req.app.get("db");
		const {
			date,
			streamTitle,
			private,
			price,
			keyWords,
			thumbnail,
			userId,
			startStream,
			streamDescription,
		} = req.body;

		const videoObj = await Video.LiveStreams.create({
			playback_policy: "public",
			reconnect_window: 10,
			new_asset_settings: { playback_policy: "public" },
		});

		const imageURL = await awsFunctions.saveImage(thumbnail.uri);

		const stream = await db.live_stream.insert_live_stream([
			videoObj.stream_key,
			videoObj.playback_ids[0].id,
			streamTitle,
			imageURL,
			date,
			keyWords,
			// userId
			1,
			private,
			startStream,
			false,
			price ? price : null,
			streamDescription,
			0,
		]);

		res.status(200).send(stream);
	},
	getScheduledLiveStreams: async (req, res) => {
		const db = req.app.get("db");

		// const date = new Date();

		const liveStreams = await db.live_stream.get_live_streams();

		res.status(200).send(liveStreams);
	},
};
