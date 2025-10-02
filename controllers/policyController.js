const { Worker } = require('worker_threads');
const path = require('path');
const Policy = require('../models/Policy');
const User = require('../models/User');

exports.uploadCSV = async (req, res) => {
	if (!req.file) return res.error('CSV file required', 400);
	const filePath = req.file.path;
	const worker = new Worker(path.join(__dirname, '../workers/csvWorker.js'), {
		workerData: { filePath, mongoUri: process.env.MONGO_URI }
	});
	worker.on('message', msg => res.success(msg, 'CSV import completed', 200));
	worker.on('error', err => res.error(err.message, 500));
};

exports.searchPolicyByUsername = async (req, res) => {
	const { username } = req.query;
	if (!username) return res.error('username required', 400);
	const user = await User.findOne({ firstName: username });
	if (!user) return res.error('User not found', 404);
	const policies = await Policy.find({ userId: user._id });
	res.success({ user, policies }, 'Policy info found', 200);
};

exports.aggregatePoliciesByUser = async (req, res) => {
	const agg = await Policy.aggregate([
		{ $group: { _id: '$userId', totalPolicies: { $sum: 1 } } }
	]);
	res.success(agg, 'Aggregated policies by user', 200);
};

exports.getAllPolicies = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await Policy.countDocuments();
	const policies = await Policy.find().skip(Number(offset)).limit(Number(limit));
	res.success({ items: policies, offset: Number(offset), limit: Number(limit), total }, 'Policies fetched');
};

exports.getPolicyById = async (req, res) => {
	const policy = await Policy.findById(req.params.id);
	if (!policy) return res.error('Policy not found', 404);
	res.success(policy, 'Policy fetched');
};

exports.createPolicy = async (req, res) => {
	const policy = new Policy(req.body);
	await policy.save();
	res.success(policy, 'Policy created', 201);
};

exports.updatePolicy = async (req, res) => {
	const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!policy) return res.error('Policy not found', 404);
	res.success(policy, 'Policy updated');
};

exports.deletePolicy = async (req, res) => {
	const policy = await Policy.findByIdAndDelete(req.params.id);
	if (!policy) return res.error('Policy not found', 404);
	res.success(null, 'Policy deleted');
};
