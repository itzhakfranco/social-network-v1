const express = require("express");
const connectDB = require("./config/db");
const app = express();
//const cors = require("cors");
const path = require("path");

connectDB();

app.use(express.json());
//app.use(cors());
app.use("/auth/", require("./routes/auth"));
app.use("/users/", require("./routes/users"));
app.use("/posts/", require("./routes/posts"));
app.use("/profile/", require("./routes/profile"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
	});
}

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
