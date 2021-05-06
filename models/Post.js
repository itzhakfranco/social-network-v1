const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const postSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 1024,
	},
	name: {
		type: String,
		minlength: 2,
		maxlength: 125,
	},
	comments: [
		{
			user_id: {
				type: mongoose.Schema.Types.ObjectId,
			},
			comment: {
				type: String,
				minlength: 4,
				maxlength: 1024,
				required: true,
			},
			name: {
				type: String,
				minlength: 4,
				maxlength: 1024,
			},

			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});
function validatePost(post) {
	const schema = Joi.object({
		text: Joi.string().min(6).max(1024).required(),
	});

	return schema.validate(post);
}
function validateComment(comment) {
	const schema = Joi.object({
		comment: Joi.string().min(4).max(1024).required(),
	});

	return schema.validate(comment);
}

const Post = mongoose.model("Post", postSchema);
exports.Post = Post;
exports.validatePost = validatePost;
exports.validateComment = validateComment;
