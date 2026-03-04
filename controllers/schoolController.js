const School = require("../models/School");

// GET all schools (old route)
const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
    console.log("Fetched schools:", schools.length, "records");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NEW: GET schools with pagination + filters
const getSchools = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const { board, region, search } = req.query;

    // Build filter query
    let filter = {};
    if (board) filter.board = board;
    if (region) filter.region = region;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { city: new RegExp(search, "i") },
        { state: new RegExp(search, "i") },
      ];
    }

    const schools = await School.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await School.countDocuments(filter);

    res.json({
      schools,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error in getSchools:", error);
    res.status(500).json({ message: "Error fetching schools" });
  }
};

module.exports = { getAllSchools, getSchools };
