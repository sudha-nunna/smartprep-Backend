const Tutor = require('../models/Tutor');

// Get all tutors
const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tutor by ID
const getTutorById = async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new tutor
const createTutor = async (req, res) => {
  try {
    const tutor = new Tutor(req.body);
    await tutor.save();
    res.status(201).json(tutor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update tutor
const updateTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.json(tutor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete tutor
const deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });
    res.json({ message: "Tutor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor
};
