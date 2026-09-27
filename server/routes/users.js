import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req,res) => {
  res.json({ user: req.user });
});

router.put('/me', auth, async (req,res) => {
  const allowed = ['name','background','interests','address','city','coordinates'];
  const update = {};
  for (const key of allowed) if (req.body[key] !== undefined) update[key] = req.body[key];
  const user = await User.findByIdAndUpdate(req.user._id, update, {new:true}).select('-password');
  res.json({user});
});

router.post('/saved/:jobId', auth, async (req,res) => {
  const user = await User.findById(req.user._id);
  const id = req.params.jobId;
  user.savedJobs = user.savedJobs.some(x => x.toString() === id)
    ? user.savedJobs.filter(x => x.toString() !== id)
    : [...user.savedJobs, id];
  await user.save();
  res.json({savedJobs:user.savedJobs});
});

export default router;
