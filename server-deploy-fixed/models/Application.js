import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String },
  coverLetter: { type: String },
  status: { type: String, enum: ['applied', 'reviewing', 'selected', 'rejected'], default: 'applied' },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
