const Account = require('../models/Account');

exports.getAllAccounts = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await Account.countDocuments();
	const accounts = await Account.find().populate('userId').skip(Number(offset)).limit(Number(limit));
	res.success({ items: accounts, offset: Number(offset), limit: Number(limit), total }, 'Accounts fetched');
};

exports.getAccountById = async (req, res) => {
	const account = await Account.findById(req.params.id).populate('userId');
	if (!account) return res.error('Account not found', 404);
	res.success(account, 'Account fetched');
};

exports.createAccount = async (req, res) => {
	const account = new Account(req.body);
	await account.save();
	res.success(account, 'Account created', 201);
};

exports.updateAccount = async (req, res) => {
	const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!account) return res.error('Account not found', 404);
	res.success(account, 'Account updated');
};

exports.deleteAccount = async (req, res) => {
	const account = await Account.findByIdAndDelete(req.params.id);
	if (!account) return res.error('Account not found', 404);
	res.success(null, 'Account deleted');
};
