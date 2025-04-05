// controllers/jobController.js

const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  try {
    const locationQuery = req.query.location;

    let filter = {};

    if (locationQuery) {
      // Support multi-value locations (like "Bengaluru, Hyderabad")
      const locations = locationQuery.split(",").map((loc) => loc.trim());
      filter.location = { $in: locations.map((loc) => new RegExp(loc, "i")) };
    }

    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
