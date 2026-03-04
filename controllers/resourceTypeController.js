const ResourceType = require("../models/ResourceType");

// Get all resource types
const getAllResourceTypes = async (req, res) => {
  try {
    const resources = await ResourceType.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllResourceTypes };
