const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    const count = courses.length;
    res.status(200).json({ count, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { name, color, avgTime, tests, difficulty, description } = req.body;

    const existing = await Course.findOne({ name });
    if (existing) return res.status(400).json({ message: "Course already exists" });

    const newCourse = new Course({ name, color, avgTime, tests, difficulty, description });
    await newCourse.save();

    res.status(201).json({ message: "Course added", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Server error" });
  }
};