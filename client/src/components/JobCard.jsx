import {Link} from 'react-router-dom';
import {ArrowUpRight, Bookmark, MapPin, Sparkles} from 'lucide-react';
import {motion} from 'framer-motion';
export default function JobCard({job,saved=false,onSave,near=false}){
 return <motion.article className="job-card" whileHover={{y:-6}} transition={{duration:.2}}>
  <div className="job-top"><div className="company-logo">{job.company?.slice(0,1)}</div><button className={saved?'save active':'save'} onClick={()=>onSave?.(job._id)} aria-label="Save job"><Bookmark size={17} fill={saved?'currentColor':'none'}/></button></div>
  <div className="job-company">{job.company}</div><Link className="job-title" to={`/jobs/${job._id}`}>{job.title}<ArrowUpRight size={17}/></Link>
  <div className="chips"><span>{job.category}</span><span>{job.workMode}</span>{near&&<span className="near"><Sparkles size={12}/> Near you</span>}</div>
  <p className="job-description">{job.description}</p>
  <div className="job-meta"><span><MapPin size={15}/>{job.location}</span><strong>৳{Number(job.salaryMin||0).toLocaleString()}–{Number(job.salaryMax||0).toLocaleString()}</strong></div>
 </motion.article>
}