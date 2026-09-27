import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {ArrowLeft,Briefcase,CheckCircle2,Clock,MapPin,Send} from 'lucide-react';
import {api,getUser} from '../lib/api';
export default function JobDetail(){
 const {id}=useParams(); const [job,setJob]=useState(null); const [note,setNote]=useState(''); const [msg,setMsg]=useState('');
 useEffect(() => {
  api.get(`/jobs/${id}`)
    .then(r => setJob(r.data.job))
    .catch(() => {});
}, [id]);
 if(!job)return <main className="page center"><div className="loader">Loading opportunity…</div></main>;
 const apply=async()=>{if(!getUser())return location.href='/login'; try{await api.post('/applications',{jobId:id,coverNote:note});setMsg('Application submitted successfully.');}catch(e){setMsg(e.response?.data?.message||'Could not submit application.')}};
 return <main className="page detail-page"><Link to="/jobs" className="back"><ArrowLeft size={16}/> Back to jobs</Link><div className="detail-layout"><article className="detail-main"><div className="detail-company"><div className="company-logo big">{job.company[0]}</div><div><span>{job.company}</span><h1>{job.title}</h1></div></div><div className="chips"><span>{job.category}</span><span>{job.type}</span><span>{job.workMode}</span></div><hr/><h2>About the role</h2><p className="long-copy">{job.description}</p><h2>What you'll use</h2><div className="skill-list">{job.skills.map(s=><span key={s}><CheckCircle2 size={14}/>{s}</span>)}</div><h2>Great fit if you're interested in</h2><div className="skill-list">{job.interests.map(s=><span key={s}>{s}</span>)}</div></article><aside className="apply-card"><div className="salary">৳{Number(job.salaryMin).toLocaleString()}–৳{Number(job.salaryMax).toLocaleString()}<small>/ month</small></div><div className="aside-line"><MapPin size={17}/>{job.location}</div><div className="aside-line"><Briefcase size={17}/>{job.workMode}</div><div className="aside-line"><Clock size={17}/>{job.type}</div><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional note to the employer…"/><button className="primary-btn full" onClick={apply}><Send size={16}/> Apply now</button>{msg&&<p className="success">{msg}</p>}</aside></div></main>
}