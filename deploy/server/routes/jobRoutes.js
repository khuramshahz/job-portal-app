import express from 'express';
import { createJob, getJobs, getJobById, getMyJobs } from '../controllers/jobController.js';
import { protect, employerOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getJobs).post(protect, employerOnly, createJob);
router.get('/myjobs', protect, employerOnly, getMyJobs);
router.get('/:id', getJobById);

export default router;
