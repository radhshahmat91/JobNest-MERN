import {Link, useNavigate} from 'react-router-dom';
import {BriefcaseBusiness, Heart, LogOut, ShieldCheck, UserRound} from 'lucide-react';
import {clearSession,getUser} from '../lib/api';
export default function Navbar(){
 const navigate=useNavigate(); const user=getUser();
 const logout=()=>{clearSession();navigate('/login')};
 return <nav className="nav"><Link className="brand" to="/"><span className="brand-mark">J</span> JobNest</Link>
 <div className="nav-links"><Link to="/jobs">Find jobs</Link>{user&&<Link to="/applications">Applications</Link>}{user?.role==='admin'&&<Link to="/admin"><ShieldCheck size={16}/> Admin</Link>}</div>
 <div className="nav-actions">{user?<><Link className="icon-link" to="/profile"><UserRound size={17}/>{user.name?.split(' ')[0]}</Link><button className="ghost-btn" onClick={logout}><LogOut size={16}/> Sign out</button></>:<><Link className="ghost-btn" to="/login">Log in</Link><Link className="primary-btn small" to="/signup">Get started</Link></>}</div>
 </nav>
}