const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: [true, "Region is required"],
      trim: true,
      minlength: [2, "Region must be at least 2 characters long"],
      maxlength: [50, "Region must be less than 50 characters"],
    },
    county: {
      type: String,
      required: [true, "County is required"],
      trim: true,
      minlength: [2, "County must be at least 2 characters long"],
      maxlength: [50, "County must be less than 50 characters"],
    },
    schools: {
      type: String,
      required: [true, "Schools count is required"],
      match: [/^[0-9]+(\+)?$/, "Schools must be a number or number+"],
    },
    examBoard: {
      type: String,
      required: [true, "Exam Board is required"],
      enum: {
        values: ["GL", "CEM", "Own Tests", "GL (own style)", "GL / CEM mix", "Own Tests / GL"],
        message:
          "Exam Board must be one of: GL, CEM, Own Tests, GL (own style), GL / CEM mix, Own Tests / GL",
      },
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      match: [
        /^bg-[a-z]+-\d{3}$/,
        "Color must be a Tailwind background class like bg-blue-500",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Region", regionSchema, "regions");
