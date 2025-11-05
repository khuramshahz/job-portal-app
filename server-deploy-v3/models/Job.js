import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  type: { type: String }, // full-time, part-time, contract
  salary: { type: String },
  description: { type: String },
  requirements: { type: [String] },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
