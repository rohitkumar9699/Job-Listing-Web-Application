const express = require("express");
const router = express.Router();
const { getJobs, getJobsByLocation } = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/search", getJobsByLocation);

module.exports = router;