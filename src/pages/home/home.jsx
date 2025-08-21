import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center gap-3 '>
    <h1>Home</h1>
    <button onClick={()=>navigate('/register')}>Sign Up</button>
    <button onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}
