const RegionalSchool = require("../models/RegionalSchool");

// Get all schools
const getAllSchools = async (req, res) => {
  try {
    const schools = await RegionalSchool.find().populate("regionId", "region county");
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get schools by regionId
const getSchoolsByRegion = async (req, res) => {
  try {
    const schools = await RegionalSchool.find({ regionId: req.params.regionId })
      .populate("regionId", "region county");
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllSchools, getSchoolsByRegion };