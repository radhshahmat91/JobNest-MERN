import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,BriefcaseBusiness,MapPin,Search,Users,Zap} from 'lucide-react';
import {motion} from 'framer-motion';
import VideoBackdrop from '../components/VideoBackdrop';
import JobCard from '../components/JobCard';
import {api,getUser} from '../lib/api';

export default function Home(){
 const [jobs,setJobs]=useState([]); const [q,setQ]=useState(''); const [city,setCity]=useState('');
 useEffect(()=>{api.get('/jobs').then(r=>setJobs(r.data.jobs)).catch(()=>{});},[]);
 const search=()=>location.href=`/jobs?search=${encodeURIComponent(q)}&location=${encodeURIComponent(city)}`;
 return <main>
  <section className="hero">
   <VideoBackdrop/>
   <div className="hero-inner">
    <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="hero-copy">
     <div className="eyebrow"><span className="pulse-dot"/> Smart job discovery for real people</div>
     <h1>Find work that fits <em>your life.</em></h1>
     <p>Search by your skills, background, interests and where you live. JobNest brings the right opportunities into one beautiful place.</p>
     <div className="hero-search">
      <div><Search size={19}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Job title, skill or company"/></div>
      <div><MapPin size={19}/><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City or area"/></div>
      <button onClick={search}>Search jobs <ArrowRight size={18}/></button>
     </div>
     <div className="hero-stats"><span><strong>10+</strong> live roles</span><span><strong>8</strong> job categories</span><span><strong>24/7</strong> discovery</span></div>
    </motion.div>
   </div>
  </section>

  <section className="section">
   <div className="section-head"><div><span className="eyebrow plain">Explore opportunities</span><h2>Roles people are looking for</h2></div><Link to="/jobs" className="text-link">Browse all <ArrowRight size={16}/></Link></div>
   <div className="category-grid">{['Technology','BPO','BTO','Database','Creative','Administration','Sales','Customer Support'].map((x,i)=><Link to={`/jobs?category=${encodeURIComponent(x)}`} className="category" key={x}><span className="category-icon">{['⌁','◌','◈','▦','✦','⌂','↗','◎'][i]}</span><b>{x}</b><small>Explore roles</small></Link>)}</div>
  </section>

  <section className="section tinted">
   <div className="section-head"><div><span className="eyebrow plain">Freshly posted</span><h2>New opportunities</h2></div><Link to="/jobs" className="text-link">See everything <ArrowRight size={16}/></Link></div>
   <div className="jobs-grid">{jobs.slice(0,6).map(j=><JobCard key={j._id} job={j}/>)}</div>
  </section>

  <section className="section split-banner">
   <div><span className="eyebrow plain">Made for your background</span><h2>Science, commerce, arts — your background shouldn't box you in.</h2><p>Tell JobNest what you studied and what you enjoy. We use those preferences to surface roles that make sense for you.</p><Link className="primary-btn" to={getUser()?'/profile':'/signup'}>Personalize my profile <ArrowRight size={17}/></Link></div>
   <div className="orbit"><div className="orbit-center">J</div><span>Science</span><span>Commerce</span><span>Arts</span><span>Interests</span></div>
  </section>
 </main>
}