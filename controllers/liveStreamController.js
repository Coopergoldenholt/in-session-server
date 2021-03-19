const Mux = require("@mux/mux-node");
const axios = require("axios");
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
			title,
			scheduleTime,
		} = req.body;

		const videoObj = await Video.LiveStreams.create({
			playback_policy: "public",
			reconnect_window: 10,
			new_asset_settings: { playback_policy: "public" },
		});

		console.log(videoObj);
	},
};
