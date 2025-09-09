import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';


export default function Designation() {

    const navigate = useNavigate();

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-violet-900">Who are you?</h1>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-20">
          {/* Student Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
               onClick={()=>{
                sessionStorage.setItem("designation","student");
                // console.log(sesssionStorage.getItem("designation"));
                navigate(`${sessionStorage.getItem("process").toLowerCase()}`);
            }}
            >
            <img
              src="https://img.icons8.com/color/96/000000/student-male.png"
              alt="Student"
              className="mx-auto mb-4"
              />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              I am a Student
            </h2>
            <Typography className="text-gray-500">
              Track your academic performance, predict outcomes, and improve your learning.
            </Typography>
            <Button sx={{
                mt: 4, // margin-top: 1rem (4 * 0.25rem)
                backgroundColor: 'primary.main',
                color: 'white',
                px: 6, // padding-left and padding-right: 1.5rem
                py: 2, // padding-top and padding-bottom: 0.5rem
                borderRadius: 'lg',
                textTransform: 'none',
                fontSize: '18px',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                },
            }}
            onClick={()=>{
                navigate("/register");
            }}
            >
              Continue as Student
            </Button>
          </div>

            {/* Teacher Card */}
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
               onClick={()=>{
                sessionStorage.setItem("designation","teacher");
               // console.log(sessionStorage.getItem("designation"));
                navigate(`${sessionStorage.getItem("process").toLowerCase()}`);
            }}       
               >
            <img
              src="https://img.icons8.com/color/96/000000/teacher.png"
              alt="Teacher"
              className="mx-auto mb-4"
              />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              I am a Teacher
            </h2>
            <Typography className="text-gray-500">
              Monitor student performance, identify weak areas, and provide better guidance.
            </Typography>
            <Button sx={{
                mt: 4, // margin-top: 1rem (4 * 0.25rem)
                backgroundColor: 'success.main',
                color: 'white',
                px: 6, // padding-left and padding-right: 1.5rem
                py: 2, // padding-top and padding-bottom: 0.5rem
                borderRadius: 'lg',
                textTransform: 'none',
                fontSize: '18px',
                '&:hover': {
                    backgroundColor: 'success.dark',
                },
            }}>
              Continue as Teacher
            </Button>

            </div>
        </div>
      </div>
      
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
)
}
