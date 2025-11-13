import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Button } from '@mui/material';

export default function SignOut() {

    const handleSignOut=()=>{
        sessionStorage.clear();
        localStorage.clear();
        window.location.href="/";
    }

  return (
    <Button 
    sx={{
  display: 'flex',
  flexDirection: 'row',
  gap: 2, // Tailwind's gap-2 = 0.5rem = 8px
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: '#7C3AED', // Tailwind violet-900
  fontWeight: 600, // font-semibold
  px: 4, // Tailwind px-4 = 1rem = 16px
  py: 2, // Tailwind py-2 = 0.5rem = 8px
  borderRadius: '0.5rem', // rounded-lg
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#EDE9FE', // Tailwind violet-100
  },
}}

    onClick={handleSignOut}>
        <ExitToAppIcon/>
        Sign Out
    </Button>
  )
}
