const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: { type: String },
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  job_link: { type: String },
  employment_type: { type: String },
  experience: { type: String },
  source: { type: String },
  country: { type: String },
  postedDateTime: { type: Date },
  companyImageUrl: { type: String },
  min_exp: { type: Number },
  max_exp: { type: Number },
});

module.exports = mongoose.model("Job", jobSchema);
