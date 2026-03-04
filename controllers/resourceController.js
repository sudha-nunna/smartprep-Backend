// const ResourceDetail = require("../models/ResourceDetail");

// // Get all resources
// const getAllResources = async (req, res) => {
//   try {
//     const resources = await ResourceDetail.find();
//     res.json(resources); // returns actual MongoDB documents
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get resources by type
// const getResourcesByType = async (req, res) => {
//   try {
//     const resources = await ResourceDetail.find({ type: req.params.type });
//     res.json(resources); // returns array of real resources
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { getAllResources, getResourcesByType };
