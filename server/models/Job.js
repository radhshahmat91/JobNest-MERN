import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  background: { type: [String], default: ['science','commerce','arts','other'] },
  interests: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  type: { type: String, enum: ['Full-time','Part-time','Contract','Internship'], default: 'Full-time' },
  workMode: { type: String, enum: ['On-site','Hybrid','Remote'], default: 'On-site' },
  salaryMin: Number,
  salaryMax: Number,
  location: { type: String, required: true },
  coordinates: { lat: Number, lng: Number },
  applyUrl: { type: String, default: '' },
  postedAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);
