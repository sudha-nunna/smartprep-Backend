const Stats = require("../models/Stats");

// @desc   Get the current stats
// @route  GET /api/stats
// @access Public
exports.getStats = async (req, res) => {
  try {
    // Find the single stats document. We sort by updatedAt (from timestamps) just in case
    // multiple documents ever exist, ensuring we get the most recent one.
    const stats = await Stats.findOne().sort({ updatedAt: -1 }).lean();

    if (!stats) {
      // If no stats are in the DB, you could return a 404 or default values.
      return res.status(404).json({ message: "Statistics not found." });
    }

    res.json(stats);
  } catch (err) {
    console.error("Error fetching stats:", err.message);
    res.status(500).json({ message: "Server error while fetching stats." });
  }
};

// @desc   Create new stats (for seeding or updating)
// @route  POST /api/stats
// @access Private (in real apps, protect with auth)
// Note: This is useful for initial setup. The updateStats endpoint with `upsert` is often more practical.
exports.createStats = async (req, res) => {
  try {
    const { perfectScores, scoreImprovement, scholarships } = req.body;

    // To ensure only one stats document, we can use findOneAndUpdate with upsert.
    // However, a simple create is fine if you manage it carefully.
    const stats = await Stats.create({
      perfectScores,
      scoreImprovement,
      scholarships,
    });

    res.status(201).json(stats);
  } catch (err) {
    console.error("Error creating stats:", err.message);
    res.status(500).json({ message: "Failed to create stats." });
  }
};

// @desc   Update the single stats document
// @route  PUT /api/stats
// @access Private
exports.updateStats = async (req, res) => {
  try {
    // Use findOneAndUpdate without an ID to update the single document.
    // `upsert: true` will create the document if it doesn't exist.
    const updatedStats = await Stats.findOneAndUpdate(
      {}, // An empty filter will match the first document found
      req.body,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.json(updatedStats);
  } catch (err) {
    console.error("Error updating stats:", err.message);
    res.status(500).json({ message: "Failed to update stats." });
  }
};
