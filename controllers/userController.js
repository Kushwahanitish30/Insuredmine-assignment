const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await User.countDocuments();
	const users = await User.find().skip(Number(offset)).limit(Number(limit));
	res.success({ items: users, offset: Number(offset), limit: Number(limit), total }, 'Users fetched');
};

exports.getUserById = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.error('User not found', 404);
	res.success(user, 'User fetched');
};

exports.createUser = async (req, res) => {
	const user = new User(req.body);
	await user.save();
	res.success(user, 'User created', 201);
};

exports.updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!user) return res.error('User not found', 404);
	res.success(user, 'User updated');
};

exports.deleteUser = async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) return res.error('User not found', 404);
	res.success(null, 'User deleted');
};
