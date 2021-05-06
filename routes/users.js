const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validate = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { name, email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) return res.status(400).send("User already registered.");

		user = new User({
			name,
			email,
			password,
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();

		res.json({
			token: user.generateAuthToken(),
			user_id: user._id,
			name: user.name,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
