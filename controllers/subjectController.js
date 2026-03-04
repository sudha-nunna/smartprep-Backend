const Subject = require("../models/Subject");

// GET /api/subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/subjects/:id
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findOne({ id: req.params.id });
    if (!subject) return res.status(404).json({ message: "Not found" });
    res.json(subject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/subjects
exports.createSubject = async (req, res) => {
  try {
    const s = new Subject(req.body);
    const saved = await s.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
