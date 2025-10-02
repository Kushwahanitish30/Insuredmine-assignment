const Agent = require('../models/Agent');

exports.getAllAgents = async (req, res) => {
	const { offset = 0, limit = 10 } = req.query;
	const total = await Agent.countDocuments();
	const agents = await Agent.find().skip(Number(offset)).limit(Number(limit));
	res.success({ items: agents, offset: Number(offset), limit: Number(limit), total }, 'Agents fetched');
};

exports.getAgentById = async (req, res) => {
	const agent = await Agent.findById(req.params.id);
	if (!agent) return res.error('Agent not found', 404);
	res.success(agent, 'Agent fetched');
};

exports.createAgent = async (req, res) => {
	const agent = new Agent(req.body);
	await agent.save();
	res.success(agent, 'Agent created', 201);
};

exports.updateAgent = async (req, res) => {
	const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!agent) return res.error('Agent not found', 404);
	res.success(agent, 'Agent updated');
};

exports.deleteAgent = async (req, res) => {
	const agent = await Agent.findByIdAndDelete(req.params.id);
	if (!agent) return res.error('Agent not found', 404);
	res.success(null, 'Agent deleted');
};
