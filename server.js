require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const { ExpressPeerServer } = require("peer");

const liveStreamCtrl = require("./controllers/liveStreamController");
const sessionCtrl = require("./controllers/sessionController");
const stripeCtrl = require("./controllers/stripeController");

app.use(express.json());

// app.get("/", (req, res) => {
// 	res.redirect(`/${uuidv4()}`);
// });

// app.get("/:room", (req, res) => {
// 	console.log(req.params.room);
// 	res.send({ roomId: req.params.room });
// });

app.post("/api/stream", liveStreamCtrl.scheduleLiveStream);

//Stripe Calls
app.post("/api/connected-user", stripeCtrl.createConnectedAccount);
app.post("/api/card", stripeCtrl.createConnectedAccount);

//Session
app.post("/api/user/register", sessionCtrl.createUser);
app.post("/api/user/login", sessionCtrl.loginUser);

io.on("connection", (socket) => {
	socket.on("create-class", (stream) => {
		console.log(stream);
		// socket.join(roomId);
		// socket.to(roomId).broadcast.emit("user-connected");
	});
	socket.on("user-exits", (user, socketID) => {
		console.log(msg);
		io.emit("chat-message", msg);
	});
});

massive({
	connectionString: CONNECTION_STRING,
	ssl: { rejectUnauthorized: false },
}).then(async (db) => {
	await app.set("db", db);
	app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} is listening`));
});
