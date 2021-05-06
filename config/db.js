const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
				useUnifiedTopology: true,
			}
		);
		console.log("MongoDB Connected");
	} catch (err) {
		console.error("Could not connect to MongoDB...");
	}
};

module.exports = connectDB;
