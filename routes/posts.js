const express = require("express");
const router = express.Router();
const { Post, validateComment, validatePost } = require("../models/Post");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/", async (req, res) => {
	const posts = await Post.find()
		.sort({ date: -1 })
		.populate("user_id", "name");
	res.json(posts);
});

router.post("/", auth, async (req, res) => {
	const { error } = validatePost(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const post = await Post.create({
		text: req.body.text,
		user_id: req.user.id,
	});
	res.status(201).json(post);
});

router.delete("/:id", auth, async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) return res.status(404).send("Invalid Post Id");

	if (post.user_id.toString() !== req.user.id)
		return res.status(404).send("Invalid Credentials");

	post.remove();

	res.status(204).json({});
});

router.post("/comment/:id", auth, async (req, res) => {
	const { error } = validateComment(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const user = await User.findById(req.user.id).select("-password");
		const post = await Post.findById(req.params.id);

		const newComment = {
			comment: req.body.comment,
			name: user.name,
			image: user.image,
			user: req.user.id,
		};

		post.comments.unshift(newComment);

		await post.save();
		const post1 = await Post.findById(req.params.id);

		res.json(post1);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Pull out comment
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);
		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: "Comment does not exist" });
		}
		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		post.comments = post.comments.filter(
			({ id }) => id !== req.params.comment_id
		);

		await post.save();

		return res.json({});
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
});

router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if the post has already been liked
		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post already liked" });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.put("/unlike/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check if the post has not yet been liked
		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post has not yet been liked" });
		}

		// remove the like
		post.likes = post.likes.filter(
			({ user }) => user.toString() !== req.user.id
		);

		await post.save();

		return res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
