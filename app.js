let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const admin = require("firebase-admin");
const SERVICE_ACCOUNT = require("./firebase-adminsdk.json.json");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Connects to Firebase and authenticates the server-side application with the service account credentials
admin.initializeApp({
	credential: admin.credential.cert(SERVICE_ACCOUNT),
});

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
