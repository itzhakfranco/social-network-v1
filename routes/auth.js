const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	const { email, password } = req.body;

	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email });
	if (!user) return res.status(400).send("Invalid email or password.");

	const validPassword = await bcrypt.compare(password, user.password);
	if (!validPassword) return res.status(400).send("Invalid email or password.");

	res.json({
		token: user.generateAuthToken(),
		user_id: user._id,
		name: user.name,
	});
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(6).max(255).required().email(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(req);
}

module.exports = router;
