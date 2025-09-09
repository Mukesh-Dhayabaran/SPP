import React from 'react';
import PersonWithChair from '../../assets/person';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const top = ['Home', 'About', 'Contact'];
  const bottom = ['Register','Login'];

  return (
   <div className="relative flex flex-col justify-center items-start h-screen bg-gradient-to-r">
  <div className="flex gap-20 mt-4 ml-8 " >
        {top.map((topbar, key) => (
          <Button
            key={key}
            sx={{
              justifyContent: 'center',
              backgroundColor: 'var(--color-violet-900)',
              color: 'white',
              px: 4,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'var(--color-violet-600)',
            
              },
            }}
          >
            {topbar}
          </Button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        
        <div className="w-[90%] md:w-[800px] h-auto md:h-[650px]">
          <PersonWithChair />
        </div>

        <div className="max-w-md text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug text-violet-800">
            Welcome to <br /> Student's <br /> Performance <br /> Prediction
          </h1>

          <p className="mt-6 md:mt-10 text-gray-700 text-sm md:text-base">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>

          <div className="flex justify-center md:justify-start gap-10 md:gap-20 mt-6 md:mt-10 ml-0 md:ml-8">
            {bottom.map((bottombar, key) => (
              <Button
                key={key}
                sx={{
                  backgroundColor: 'var(--color-violet-900)',
                  color: 'white',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'var(--color-violet-600)'
                  },
                }}
                onClick={() =>{ 
              sessionStorage.setItem("process",bottombar.toLowerCase()),
              navigate("/designation")}}
              >
                {bottombar}
              </Button>
            ))}
          
        <Box
          sx={{
            position: 'fixed',
            top: { xs: -60, sm: -80, md: -100 },
            right: { xs: -60, sm: -80, md: -100 },
            width: { xs: 150, sm: 250, md: 400 },
            height: { xs: 150, sm: 250, md: 400 },
            borderRadius: '50%',
            backgroundColor: '#5B21B6',
            opacity: 0.1
            }}
          />

        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: -60, sm: -80, md: -100 },
            left: { xs: -60, sm: -80, md: -100 },
            width: { xs: 150, sm: 250, md: 400 },
            height: { xs: 150, sm: 250, md: 400 },
            borderRadius: '50%',
            backgroundColor: '#5B21B6',
            opacity: 0.1
          }}
        />
      </div>
    </div>
  </div>
  </div>
  );
}