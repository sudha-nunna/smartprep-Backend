

const PracticeTest = require("../models/PracticeTest");

// ✅ Get all practice tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find();
    res.status(200).json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

// ✅ Get a single test by ID
exports.getTestById = async (req, res) => {
  try {
    const fullTest = await PracticeTest.findById(req.params.id).lean();
    if (!fullTest) return res.status(404).json({ error: "Test not found" });

    // Separate questions from the main test object to match frontend expectations
    const { questions, ...testDetails } = fullTest;

    res.status(200).json({ test: testDetails, questions: questions || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch test" });
  }
};

// ✅ Create a new test
exports.createTest = async (req, res) => {
  try {
    const newTest = new PracticeTest(req.body);
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create test" });
  }
};
