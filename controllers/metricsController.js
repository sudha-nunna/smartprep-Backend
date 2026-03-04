const Metrics = require('../models/Metrics');

// GET metrics
exports.getMetrics = async (req, res) => {
  try {
    const metrics = await Metrics.findOne(); // only one record
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST metrics (seed data)
exports.createMetrics = async (req, res) => {
  try {
    const newMetrics = new Metrics(req.body);
    await newMetrics.save();
    res.status(201).json(newMetrics);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};
