import SuccessStory from "../models/SuccessStory.js";

// GET all stats
export const getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new stat
export const createSuccessStory = async (req, res) => {
  try {
    const story = new SuccessStory(req.body);
    const saved = await story.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
