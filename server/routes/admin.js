import express from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();
router.use(auth, adminOnly);

router.get('/stats', async (_,res) => {
  const [jobs, applications] = await Promise.all([Job.countDocuments(), Application.countDocuments()]);
  res.json({jobs, applications});
});

router.post('/jobs', async (req,res) => {
  const job = await Job.create(req.body);
  res.status(201).json({job});
});

router.put('/jobs/:id', async (req,res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json({job});
});

router.delete('/jobs/:id', async (req,res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ok:true});
});

router.get('/applications', async (_,res) => {
  const applications = await Application.find().populate('user','name email').populate('job','title company').sort({createdAt:-1});
  res.json({applications});
});

router.patch('/applications/:id', async (req,res) => {
  const application = await Application.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});
  res.json({application});
});

export default router;
