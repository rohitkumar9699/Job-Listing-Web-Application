// backend/scripts/importJobs.js
const mongoose = require("mongoose");
const Job = require("../models/Job");
const data = require("./jobs.json"); // your file

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany();
  await Job.insertMany(data);
  console.log("Jobs imported!");
  process.exit();
});
