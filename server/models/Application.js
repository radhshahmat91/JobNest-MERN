import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  coverNote: { type: String, default: '' },
  status: { type: String, enum: ['Applied','Reviewing','Shortlisted','Rejected','Hired'], default: 'Applied' }
}, { timestamps: true });

ApplicationSchema.index({ user: 1, job: 1 }, { unique: true });
export default mongoose.model('Application', ApplicationSchema);
