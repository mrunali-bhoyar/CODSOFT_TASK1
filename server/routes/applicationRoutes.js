const express = require("express");
const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

// Get logged-in candidate's applications
router.get("/my-applications", protect, getMyApplications);
// Get applicants for a specific job
router.get("/job/:jobId", protect, getApplicantsForJob);
// Apply for a job
router.post("/:jobId", protect, applyForJob);
router.put("/:applicationId", protect, updateApplicationStatus);
module.exports = router;