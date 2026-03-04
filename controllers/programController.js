const Program = require("../models/Program.js");

// 📌 Seed database with initial programs
const seedPrograms = async (req, res) => {
  try {
    const programs = [
      {
        icon: "Calculator",
        title: "Math",
        age: "Ages 9-11",
        description:
          "Master arithmetic, algebra, geometry and problem-solving skills essential for London grammar school entrance.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: "PenTool",
        title: "English Language",
        age: "Ages 9-11",
        description:
          "Develop reading comprehension, creative writing, and grammar skills for top London schools.",
        color: "bg-green-100 text-green-600",
      },
      {
        icon: "Brain",
        title: "Verbal Reasoning",
        age: "Ages 9-11",
        description:
          "Build logical thinking and vocabulary skills through word puzzles and comprehension exercises.",
        color: "bg-purple-100 text-purple-600",
      },
      {
        icon: "Target",
        title: "Non-Verbal Reasoning",
        age: "Ages 9-11",
        description:
          "Enhance pattern recognition and spatial awareness for visual logic questions.",
        color: "bg-orange-100 text-orange-600",
      },
      {
        icon: "BookOpen",
        title: "Mock Exams",
        age: "All levels",
        description:
          "Practice with authentic past papers from top London grammar and independent schools.",
        color: "bg-red-100 text-red-600",
      },
      {
        icon: "School",
        title: "School Selection",
        age: "Parent guidance",
        description:
          "Expert advice on choosing the right London schools and application strategies.",
        color: "bg-teal-100 text-teal-600",
      },
    ];

    await Program.deleteMany(); // Clear old data
    const saved = await Program.insertMany(programs);

    res.status(201).json({
      message: "Programs seeded successfully!",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Get all programs
const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Add a new program
const createProgram = async (req, res) => {
  try {
    const { icon, title, age, description, color } = req.body;

    const newProgram = new Program({
      icon,
      title,
      age,
      description,
      color,
    });

    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  seedPrograms,
  getPrograms,
  createProgram,
};
