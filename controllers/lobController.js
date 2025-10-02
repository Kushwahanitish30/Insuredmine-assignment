const LOB = require('../models/LOB');

exports.getAllLOBs = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await LOB.countDocuments();
	const lobs = await LOB.find().skip(Number(offset)).limit(Number(limit));
	res.success({ items: lobs, offset: Number(offset), limit: Number(limit), total }, 'LOBs fetched');
};

exports.getLOBById = async (req, res) => {
	const lob = await LOB.findById(req.params.id);
	if (!lob) return res.error('LOB not found', 404);
	res.success(lob, 'LOB fetched');
};

exports.createLOB = async (req, res) => {
	const lob = new LOB(req.body);
	await lob.save();
	res.success(lob, 'LOB created', 201);
};

exports.updateLOB = async (req, res) => {
	const lob = await LOB.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!lob) return res.error('LOB not found', 404);
	res.success(lob, 'LOB updated');
};

exports.deleteLOB = async (req, res) => {
	const lob = await LOB.findByIdAndDelete(req.params.id);
	if (!lob) return res.error('LOB not found', 404);
	res.success(null, 'LOB deleted');
};
