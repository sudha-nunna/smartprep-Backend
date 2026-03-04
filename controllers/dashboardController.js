const Dashboard = require("../models/dashboardModel");

const getDashboard = async (req, res) => {
  try {
    const stats = await Dashboard.findOne();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

const updateDashboard = async (req, res) => {
  try {
    const { practiceTests, avgDuration, studentsTested, avgRating } = req.body;
    const stats = await Dashboard.findByIdAndUpdate(
      req.params.id,
      { practiceTests, avgDuration, studentsTested, avgRating },
      { new: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error updating dashboard", error });
  }
};

module.exports = { getDashboard, updateDashboard };
