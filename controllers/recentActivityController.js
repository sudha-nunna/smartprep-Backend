const RecentActivity = require("../models/RecentActivity");

//  Create new activity
exports.createActivity = async (req, res) => {
  try {
    const activity = new RecentActivity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  Get all activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await RecentActivity.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
