import express from 'express';
import multer from 'multer';
import { applyToJob, getApplicationsForJob, getMyApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, employerOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

const upload = multer({ storage });

router.post('/', protect, upload.single('resume'), applyToJob);
router.get('/myapplications', protect, getMyApplications);
router.get('/job/:jobId', protect, employerOnly, getApplicationsForJob);
router.put('/:id/status', protect, employerOnly, updateApplicationStatus);

export default router;
