import 'dotenv/config';
import dns from 'node:dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Job from '../models/Job.js';

const jobs = [
  ['Frontend Developer','NovaByte Technologies','Build polished React interfaces and reusable components.','Technology',['science','other'],['web','frontend','react'],['React','JavaScript','CSS'],'Full-time','Hybrid',45000,70000,'Uttara, Dhaka',23.8759,90.3795,true],
  ['Backend Developer','CloudCore Labs','Develop REST APIs, authentication and database integrations.','Technology',['science'],['backend','api','server'],['Node.js','Express','MongoDB'],'Full-time','On-site',50000,80000,'Banani, Dhaka',23.7937,90.4066,false],
  ['Database Executive','DataBridge BD','Maintain records, queries and reporting workflows.','Database',['science','commerce'],['database','data'],['SQL','Excel','MongoDB'],'Full-time','On-site',30000,50000,'Motijheel, Dhaka',23.7331,90.4173,false],
  ['BPO Customer Support Executive','GlobalServe','Communicate with international customers in professional English.','BPO',['science','commerce','arts','other'],['communication','customer service','english'],['English','CRM','Communication'],'Full-time','On-site',28000,42000,'Gulshan, Dhaka',23.7925,90.4078,true],
  ['BTO Operations Associate','Nexa Process','Coordinate international back-office operations and reports.','BTO',['commerce','arts','other'],['operations','communication'],['Excel','English','Reporting'],'Full-time','Hybrid',30000,45000,'Mohakhali, Dhaka',23.7799,90.4005,false],
  ['Video Editor','FrameLab Studio','Edit short-form social content and promotional videos.','Creative',['arts','science','other'],['video','creative','editing'],['Premiere Pro','DaVinci Resolve','After Effects'],'Full-time','Hybrid',30000,55000,'Dhanmondi, Dhaka',23.7465,90.3760,true],
  ['Receptionist / Front Desk Executive','Urban Heights','Welcome visitors, handle calls and coordinate office reception.','Administration',['arts','commerce','other'],['communication','customer service'],['English','Communication','MS Office'],'Full-time','On-site',22000,32000,'Dhanmondi, Dhaka',23.7465,90.3760,false],
  ['Sales Executive','MarketMint','Build client relationships and meet sales targets.','Sales',['commerce','arts','other'],['sales','communication','business'],['English','Negotiation','CRM'],'Full-time','On-site',25000,45000,'Paltan, Dhaka',23.7361,90.4125,false],
  ['QA Engineer','QualityNest','Test web applications and document product issues.','Technology',['science'],['testing','quality','web'],['Testing','Postman','JavaScript'],'Full-time','Hybrid',40000,65000,'Farmgate, Dhaka',23.7577,90.3880,false],
  ['Content & Social Media Executive','BrightCanvas','Plan, write and publish digital content.','Creative',['arts','commerce','other'],['content','social media','writing'],['Writing','Canva','Social Media'],'Full-time','Remote',25000,45000,'Dhaka',23.8103,90.4125,false]
].map(j => ({
  title:j[0], company:j[1], description:j[2], category:j[3], background:j[4], interests:j[5], skills:j[6],
  type:j[7], workMode:j[8], salaryMin:j[9], salaryMax:j[10], location:j[11],
  coordinates:{lat:j[12],lng:j[13]}, featured:j[14]
}));

await mongoose.connect(process.env.MONGODB_URI);
await Job.deleteMany({});
await Job.insertMany(jobs);

const adminEmail = 'admin@jobnest.local';
if (!await User.findOne({email:adminEmail})) {
  await User.create({
    name:'JobNest Admin', email:adminEmail, role:'admin',
    password:await bcrypt.hash('Admin@12345',12)
  });
}
const demoEmail = 'demo@jobnest.local';
if (!await User.findOne({email:demoEmail})) {
  await User.create({
    name:'Demo User', email:demoEmail, background:'science',
    interests:['web','communication'],
    password:await bcrypt.hash('Demo@12345',12)
  });
}
console.log('Seed complete.');
await mongoose.disconnect();
