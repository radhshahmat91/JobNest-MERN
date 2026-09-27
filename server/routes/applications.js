import express from 'express';
import Application from '../models/Application.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req,res) => {
  try {
    const application = await Application.create({
      user:req.user._id, job:req.body.jobId, coverNote:req.body.coverNote || ''
    });
    res.status(201).json({application});
  } catch(e) {
    if (e.code === 11000) return res.status(409).json({message:'You already applied to this job'});
    res.status(500).json({message:e.message});
  }
});

router.get('/mine', auth, async (req,res) => {
  const applications = await Application.find({user:req.user._id}).populate('job').sort({createdAt:-1});
  res.json({applications});
});

export default router;
