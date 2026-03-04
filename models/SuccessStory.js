import mongoose from "mongoose";

const successSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true }, // e.g. "TrendingUp"
});

export default mongoose.model("SuccessStory", successSchema);
