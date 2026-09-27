import express from 'express';
import Job from '../models/Job.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req,res) => {
  try {
    const { search='', category, background, workMode, location, interest } = req.query;
    const query = {};
    if (search) query.$or = [
      {title: {$regex:search,$options:'i'}},
      {company: {$regex:search,$options:'i'}},
      {skills: {$regex:search,$options:'i'}}
    ];
    if (category) query.category = category;
    if (background) query.background = background;
    if (workMode) query.workMode = workMode;
    if (location) query.location = {$regex:location,$options:'i'};
    if (interest) query.interests = {$regex:interest,$options:'i'};
    const jobs = await Job.find(query).sort({featured:-1, postedAt:-1}).limit(100);
    res.json({jobs});
  } catch(e) { res.status(500).json({message:e.message}); }
});

router.get('/:id', async (req,res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({message:'Job not found'});
  res.json({job});
});

export default router;
