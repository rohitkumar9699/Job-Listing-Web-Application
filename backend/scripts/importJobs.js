const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../models/Job");
const rawData = require("./jobs.json");

dotenv.config();

const normalizeJobData = (job) => {
  return {
    jobIdNumeric:
      typeof job["Job ID (Numeric)"] === "object" && "$numberLong" in job["Job ID (Numeric)"]
        ? job["Job ID (Numeric)"]["$numberLong"]
        : String(job["Job ID (Numeric)"]),

    title: job.title || "",
    company: job.company || "",
    location: job.location || "",
    job_link: job.job_link || "",
    employment_type: job.employment_type || "",
    experience: job.experience || "",
    source: job.source || "",
    country: job.country || "",

    postedDateTime:
      job.postedDateTime && job.postedDateTime["$date"]
        ? new Date(job.postedDateTime["$date"])
        : new Date(),

    companyImageUrl:
      typeof job.companyImageUrl === "object" && "$numberDouble" in job.companyImageUrl
        ? "https://via.placeholder.com/150"
        : job.companyImageUrl || "https://via.placeholder.com/150",

    min_exp: job.min_exp || 0,
    max_exp: job.max_exp || 0,
  };
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const normalizedJobs = rawData.map(normalizeJobData);

    await Job.deleteMany();
    await Job.insertMany(normalizedJobs);
    console.log("✅ Jobs imported successfully!");

    process.exit();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

importData();
