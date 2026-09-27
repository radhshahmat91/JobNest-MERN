import {Navigate} from 'react-router-dom';
import {getUser} from '../lib/api';
export default function Protected({children,admin=false}){const u=getUser(); if(!u)return <Navigate to="/login"/>; if(admin&&u.role!=='admin')return <Navigate to="/"/>; return children}