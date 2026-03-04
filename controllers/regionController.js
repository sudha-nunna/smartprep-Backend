const Region = require("../models/Region");

// GET all regions
const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
    console.log("Fetched regions:", regions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRegions };
