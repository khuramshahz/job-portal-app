import asyncHandler from 'express-async-handler';
import Application from '../models/Application.js';
import Job from '../models/Job.js';

// @desc    Apply to a job (applicant)
// @route   POST /api/applications
// @access  Private/Applicant
const applyToJob = asyncHandler(async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : req.body.resumeUrl;
  const job = await Job.findById(jobId);
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }
  const existing = await Application.findOne({ job: jobId, applicant: req.user._id });
  if (existing) {
    res.status(400);
    throw new Error('Already applied');
  }
  const application = await Application.create({ job: jobId, applicant: req.user._id, resumeUrl, coverLetter });
  res.status(201).json(application);
});

// @desc    Get applications for a job (employer)
// @route   GET /api/applications/job/:jobId
// @access  Private/Employer
const getApplicationsForJob = asyncHandler(async (req, res) => {
  const apps = await Application.find({ job: req.params.jobId }).populate('applicant', 'name email');
  res.json(apps);
});

// @desc    Get applications by applicant
// @route   GET /api/applications/myapplications
// @access  Private/Applicant
const getMyApplications = asyncHandler(async (req, res) => {
  const apps = await Application.find({ applicant: req.user._id }).populate('job');
  res.json(apps);
});

// @desc    Update application status (employer)
// @route   PUT /api/applications/:id/status
// @access  Private/Employer
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate('job');
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  // ensure current user is the employer of the job
  if (String(application.job.employer) !== String(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to update this application');
  }
  application.status = status;
  const updated = await application.save();
  res.json(updated);
});

export { applyToJob, getApplicationsForJob, getMyApplications, updateApplicationStatus };
