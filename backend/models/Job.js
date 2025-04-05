const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobIdNumeric: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  company: String,
  location: String,
  job_link: String,
  employment_type: String,
  experience: String,
  source: String,
  country: String,
  postedDateTime: {
    type: Date,
    default: Date.now,
  },
  companyImageUrl: String,
  min_exp: Number,
  max_exp: Number,
});

module.exports = mongoose.model("Job", jobSchema);
