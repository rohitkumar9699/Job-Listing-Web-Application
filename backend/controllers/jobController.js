const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.getJobsByLocation = async (req, res) => {
  const location = req.query.location;
  const jobs = await Job.find({ location: new RegExp(location, "i") });
  res.json(jobs);
};