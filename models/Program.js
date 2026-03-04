const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // store icon name as string
  title: { type: String, required: true },
  age: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
