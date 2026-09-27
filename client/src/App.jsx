import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import Admin from './pages/Admin';
import Protected from './components/Protected';
export default function App(){
 return <><Navbar/><Routes>
  <Route path="/" element={<Home/>}/><Route path="/jobs" element={<Jobs/>}/><Route path="/jobs/:id" element={<JobDetail/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/>
  <Route path="/profile" element={<Protected><Profile/></Protected>}/><Route path="/applications" element={<Protected><Applications/></Protected>}/>
  <Route path="/admin" element={<Protected admin><Admin/></Protected>}/>
 </Routes></>
}