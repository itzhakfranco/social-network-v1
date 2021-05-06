const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const profileSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	name: {
		type: String,
	},

	company: {
		type: String,
		minlength: 4,
		maxlength: 255,
	},
	website: {
		type: String,
		minlength: 5,
		maxlength: 255,
	},
	location: {
		type: String,
		minlength: 5,
		maxlength: 255,
	},
	status: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
		minlength: 5,
		maxlength: 500,
	},
	bio: {
		type: String,
		minlength: 2,
		maxlength: 500,
	},
	image: {
		type: String,
		minlength: 0,
		maxlength: 1024,
		default:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	},
	experience: [
		{
			title: {
				type: String,
				minlength: 2,
				maxlength: 30,
			},
			company: {
				type: String,
				minlength: 2,
				maxlength: 255,
			},
			location: {
				type: String,
				minlength: 2,
				maxlength: 50,
			},
			from: {
				type: Date,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
				minlength: 2,
				maxlength: 500,
			},
		},

		{
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
				required: true,
				minlength: 2,
				maxlength: 255,
			},
			degree: {
				type: String,
				required: true,
				minlength: 2,
				maxlength: 255,
			},
			fieldofstudy: {
				type: String,
				required: true,
				minlength: 2,
				maxlength: 255,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
				minlength: 2,
				maxlength: 500,
			},
		},
	],

	date: {
		type: Date,
		default: Date.now,
	},
});

function validateProfile(user) {
	const schema = Joi.object({
		company: Joi.string().min(4).max(255).required(),
		website: Joi.string().min(5).max(255).required(),
		location: Joi.string().min(5).max(255).required(),
		status: Joi.string().required().required(),
		skills: Joi.string().min(1).max(255).required(),
		bio: Joi.string().min(2).max(500).required(),
		image: Joi.string().min(0).max(1024).allow(""),
	});

	return schema.validate(user);
}
function validateExperience(experience) {
	const schema = Joi.object({
		title: Joi.string().min(2).max(30),
		company: Joi.string().min(2).max(255),
		location: Joi.string().min(2).max(50),
		from: Joi.string(),
		to: Joi.any(),
		current: Joi.bool(),
		description: Joi.string().min(2).max(500),
	});

	return schema.validate(experience);
}

function validateEducation(education) {
	const schema = Joi.object({
		school: Joi.string().min(2).max(30).required(),
		degree: Joi.string().min(2).max(255).required(),
		fieldofstudy: Joi.string().min(2).max(50),
		from: Joi.string().required(),
		to: Joi.any(),
		current: Joi.bool(),
		description: Joi.string().min(2).max(500),
	});

	return schema.validate(education);
}

const Profile = mongoose.model("Profile", profileSchema);
exports.Profile = Profile;
exports.validateProfile = validateProfile;
exports.validateExperience = validateExperience;
exports.validateEducation = validateEducation;
