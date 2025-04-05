const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  employmentType: String,
  postedDate: Date,
  source: String,
  experienceRange: String,
});

module.exports = mongoose.model("Job", jobSchema);