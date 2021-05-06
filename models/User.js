const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Profile",
	},

	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 255,
	},

	email: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 1024,
	},
	image: {
		type: String,
		minlength: 6,
		maxlength: 1024,
		default:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	},
	createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ id: this._id, name: this.name },
		config.get("jwtSecret")
	);
	return token;
};

function validateUser(data) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		email: Joi.string().min(6).max(255).required().email(),
		password: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(data);
}
module.exports = mongoose.model("User", userSchema);
exports.validate = validateUser;
