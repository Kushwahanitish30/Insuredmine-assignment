const Carrier = require('../models/Carrier');

exports.getAllCarriers = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await Carrier.countDocuments();
	const carriers = await Carrier.find().skip(Number(offset)).limit(Number(limit));
	res.success({ items: carriers, offset: Number(offset), limit: Number(limit), total }, 'Carriers fetched');
};

exports.getCarrierById = async (req, res) => {
	const carrier = await Carrier.findById(req.params.id);
	if (!carrier) return res.error('Carrier not found', 404);
	res.success(carrier, 'Carrier fetched');
};

exports.createCarrier = async (req, res) => {
	const carrier = new Carrier(req.body);
	await carrier.save();
	res.success(carrier, 'Carrier created', 201);
};

exports.updateCarrier = async (req, res) => {
	const carrier = await Carrier.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!carrier) return res.error('Carrier not found', 404);
	res.success(carrier, 'Carrier updated');
};

exports.deleteCarrier = async (req, res) => {
	const carrier = await Carrier.findByIdAndDelete(req.params.id);
	if (!carrier) return res.error('Carrier not found', 404);
	res.success(null, 'Carrier deleted');
};
