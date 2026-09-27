import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const sign = user => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/signup', async (req,res) => {
  try {
    const { name, email, password, background='other', interests=[] } = req.body;
    if (!name || !email || !password) return res.status(400).json({message:'Name, email and password are required'});
    if (await User.findOne({email})) return res.status(409).json({message:'Email is already registered'});
    const user = await User.create({
      name, email, background, interests,
      password: await bcrypt.hash(password, 12)
    });
    res.status(201).json({ token: sign(user), user: { ...user.toObject(), password: undefined }});
  } catch (e) { res.status(500).json({message:e.message}); }
});

router.post('/login', async (req,res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({message:'Invalid email or password'});
    res.json({ token: sign(user), user: { ...user.toObject(), password: undefined }});
  } catch (e) { res.status(500).json({message:e.message}); }
});

export default router;
