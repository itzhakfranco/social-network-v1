const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
	Profile,
	validateEducation,
	validateExperience,
	validateProfile,
} = require("../models/Profile");

//Profile Section

//Add new profile
router.post("/", auth, async (req, res) => {
	const { errors } = validateProfile(req.body);
	if (errors) return res.status(400).send(errors.details[0].message);

	let profile = new Profile({
		user_id: req.user.id,
		name: req.user.name,
		company: req.body.company,
		location: req.body.location,
		website: req.body.website,
		bio: req.body.bio,
		skills: Array.isArray(req.body.skills)
			? req.body.skills
			: req.body.skills.split(",").map((skill) => " " + skill.trim()),
		status: req.body.status,
		image: req.body.image && req.body.image,
	});

	profile = await profile.save();
	res.json(profile);
});

//Update Profile
router.put("/:id", auth, async (req, res) => {
	const { error } = validateProfile(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { company, website, location, status, skills, bio } = req.body;

	const profileFields = {
		user: req.user.id,
		name: req.user.name,
		company,
		location,
		website,
		bio,
		skills: Array.isArray(skills)
			? skills
			: skills.split(",").map((skill) => " " + skill.trim()),
		status,
	};

	let profile = await Profile.findOneAndUpdate(
		{ _id: req.params.id, user_id: req.user.id },
		{ $set: profileFields },
		{ new: true }
	);
	if (!profile) return res.status(404).send("Invalid credentials");

	res.json(profile);
});

//Fetch All Profiles
router.get("/view/profiles", async (req, res) => {
	const profiles = await Profile.find({});

	if (!profiles) return res.status(500).send("Server Error");
	res.json(profiles);
});

//Fetch LoggedIn User Profile
router.get("/", auth, async (req, res) => {
	const profile = await Profile.findOne({
		user_id: req.user.id,
	});

	if (!profile) return res.status(204).json(null);
	res.json(profile);
});

//Fetch Profile By Id
router.get("/:id", async (req, res) => {
	const profile = await Profile.findOne({
		_id: req.params.id,
	});

	if (!profile) return res.status(400).send("Invalid Profile Id");
	res.json(profile);
});

//Delete Profile
router.delete("/:id", auth, async (req, res) => {
	const profile = await Profile.findOneAndRemove({
		_id: req.params.id,
		user_id: req.user.id,
	});
	if (!profile) return res.status(400).send("Invalid Profile Id");
	if (profile) return res.status(204).json({});
});

//Experience Section

//Add new Experience
router.post("/experience", auth, async (req, res) => {
	const { error } = validateExperience(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let profile = await Profile.findOneAndUpdate(
		{ user_id: req.user.id },
		{ $push: { experience: req.body } },
		{ new: true }
	);
	if (!profile) return res.status(400).send("This user has no profile");

	res.status(201).json(profile);
});

//Get Experience By Id
router.get("/experience/:id", auth, async (req, res) => {
	const profile = await Profile.findOne({
		user_id: req.user.id,
	});

	if (!profile) return res.status(400).send("Invalid Experience ID");

	const experience = profile.experience.filter(
		(exp) => exp._id == req.params.id
	)[0];

	res.json(experience);
});

//Update Experience
router.put("/experience/edit/:id", auth, async (req, res) => {
	const { error } = validateExperience(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const profile = await Profile.findOne({ user_id: req.user.id });
	if (!profile) return res.status(400).send("Invlaid ID");
	const experiencePosition = profile.experience.findIndex(
		(exp) => exp._id.toString() === req.params.id
	);

	const updatedExperince = {
		_id: profile.experience[experiencePosition]._id,
		title: req.body.title,
		company: req.body.company,
		location: req.body.location,
		from: req.body.from,
		to: req.body.to,
		current: req.body.current,
		description: req.body.description,
	};

	profile.experience[experiencePosition] = updatedExperince;

	await profile.save();

	res.json(profile);
});

//Delete Experience
router.delete("/experience/:id", auth, async (req, res) => {
	const profile = await Profile.findOne({ user_id: req.user.id });

	const removeIndex = profile.experience
		.map((item) => item.id)
		.indexOf(req.params.id);

	profile.experience.splice(removeIndex, 1);

	await profile.save();
	res.json(profile);
});

//Eduction Section

//Add new Experience
router.post("/education", auth, async (req, res) => {
	const { error } = validateEducation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let profile = await Profile.findOneAndUpdate(
		{ user_id: req.user.id },
		{ $push: { education: req.body } },
		{ new: true }
	);
	if (!profile) return res.status(400).send("This user has no profile");

	res.status(201).json(profile);
});

//Get Experience By Id
router.get("/education/:id", auth, async (req, res) => {
	const profile = await Profile.findOne({
		user_id: req.user.id,
	});

	if (!profile) return res.status(400).send("Invalid Education ID");

	const education = profile.education.filter(
		(edu) => edu._id == req.params.id
	)[0];

	res.json(education);
});

//Update Experience
router.put("/education/edit/:id", auth, async (req, res) => {
	const { error } = validateEducation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const profile = await Profile.findOne({ user_id: req.user.id });
	if (!profile) return res.status(400).send("Invlaid ID");
	const educationPosition = profile.education.findIndex(
		(edu) => edu._id.toString() === req.params.id
	);

	const updatedEducation = {
		_id: profile.education[educationPosition]._id,
		school: req.body.school,
		degree: req.body.degree,
		fieldofstudy: req.body.fieldofstudy,
		from: req.body.from,
		to: req.body.to,
		current: req.body.current,
		description: req.body.description,
	};

	profile.education[educationPosition] = updatedEducation;

	await profile.save();

	res.json(profile);
});

//Delete Experience
router.delete("/education/:id", auth, async (req, res) => {
	const profile = await Profile.findOne({ user_id: req.user.id });

	const removeIndex = profile.education
		.map((item) => item.id)
		.indexOf(req.params.id);

	profile.education.splice(removeIndex, 1);

	await profile.save();
	res.json(profile);
});

module.exports = router;
