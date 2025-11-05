import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';

// @desc    Create a job (employer)
// @route   POST /api/jobs
// @access  Private/Employer
const createJob = asyncHandler(async (req, res) => {
  const { title, company, location, type, salary, description, requirements } = req.body;
  const job = new Job({ title, company, location, type, salary, description, requirements, employer: req.user._id });
  const created = await job.save();
  res.status(201).json(created);
});

// @desc    Get all jobs with filters and search
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const { search, location, type, page = 1, limit = 10 } = req.query;
  const query = {};
  if (search) query.$or = [ { title: { $regex: search, $options: 'i' } }, { company: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } } ];
  if (location) query.location = { $regex: location, $options: 'i' };
  if (type) query.type = type;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const jobs = await Job.find(query).populate('employer', 'name email').skip(skip).limit(limitNum);
  const total = await Job.countDocuments(query);

  res.json({ jobs, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate('employer', 'name email');
  if (job) res.json(job);
  else {
    res.status(404);
    throw new Error('Job not found');
  }
});

// @desc    Get jobs posted by employer
// @route   GET /api/jobs/myjobs
// @access  Private/Employer
const getMyJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ employer: req.user._id });
  res.json(jobs);
});

export { createJob, getJobs, getJobById, getMyJobs };
