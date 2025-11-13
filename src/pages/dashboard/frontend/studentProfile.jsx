import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Divider, Avatar, Button, CircularProgress } from "@mui/material";
import SignOut from "./signOut";
// import { isAuthenticated } from "../../../authentication/services/auth";

export default function StudentProfile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    const registerNumber = sessionStorage.getItem("registerNumber");
    if (sessionStorage.getItem('designation')==='student' && !registerNumber) {
      console.error("⚠️ No register number found in sessionStorage");
      navigate("/designation/login");
      return;
    }

      fetch(`https://student-performance-prediction-iqg2.onrender.com/get_student/${registerNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student data");
        return res.json();
      })
      .then((data) => setStudent(data))
      .catch((err) => console.error("❌ Error fetching student:", err))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <CircularProgress size={60} sx={{ color: "#7C3AED" }} />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Typography variant="h5" color="error">
          No student data found.
        </Typography>
      </div>
    );
  }

  const details = [
    ["Name", student.Name],
    ["Register Number", student.Register_Number],
    ["Class", student.Class],
    ["Section", student.Section],
    ["Attendance (%)", student.Attendance],
    ["Weekly Study Hours", student.Hours_Studied_Per_Week],
    ["Previous Exam (%)", student.Previous_Exam_Percent],
    ["Failures", student.Failures],
    ["Sports", student.Sports],
    ["Tuition", student.Tuition],
    ["Parents Support", student.Parents_Support],
    ["Internet Facility", student.Internet_Facility],
    ["Predicted Score", student.predicted_score],
    ["Category", student.category],
  ].filter(([, value]) => value !== undefined && value !== "");

  return (
    <div className="min-h-screen  flex justify-center items-center p-6">
      <Card sx={{ width: "100%", maxWidth: "80rem", borderRadius: "24px", overflow: "hidden", display: "flex", flexDirection: { xs: "column", md: "row" }, bgcolor: "white", boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.25)" }}>
        <div className="bg-gradient-to-b from-[#8995cd] to-[var(--color-violet-900)] text-white flex flex-col items-center justify-center p-11 md:w-1/3 space-y-8">
          <Avatar sx={{ width: 140, height: 140,color:"var(--color-violet-900)", bgcolor: "white", fontSize: 60 }}>
            {student.Name ? student.Name.charAt(0).toUpperCase() : "S"}
          </Avatar>
          <Typography variant="h4" className="font-bold text-center">{student.Name}</Typography>
          <Button variant="contained" onClick={() => navigate("/prediction-page")} sx={{ fontSize:"17px",mt: 8, backgroundColor: "white", color: "rgba(124, 58, 237, 1)", border: "2px solid white", "&:hover": { backgroundColor: "var(--color-violet-900)", color: "white" }, px: 6, py: 1.5, borderRadius: "10px", textTransform: "none" }} >Predict</Button>
        </div>

        <div className={`flex-1 p-12 ${sessionStorage.getItem('designation')==='teacher'&&"pb-5"} flex flex-col justify-center space-y-8`}>
            <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <Typography variant="h3" className="text-violet-900 font-bold mb-4 text-center md:text-left">Student Details</Typography>
            <SignOut/>
          </div>
          <Divider className="mb-8" />
            </div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {details.map(([label, value], idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <Typography className="font-semibold text-gray-700 text-lg">{label}</Typography>
                <Typography className="text-gray-900 text-lg">{value ?? "N/A"}</Typography>
              </div>
            ))}
          </div>
          <Divider className="my-8" />
    {student.category && sessionStorage.getItem('designation') === 'student' && (
      <span className="mt-4">
        <Typography className="text-gray-600 text-center md:text-left text-lg" sx={{ fontWeight: "bold",color: student.category === "High" ? "green" : student.category === "Medium" ? "orange" : "red" }}>
          {student.category === "High" ? "Excellent! Keep up your great performance! 💪" :
           student.category === "Medium" ? "Good work! Stay consistent and aim higher. 🚀" :
           "Don’t worry, you can improve with steady effort! 🌱"}
        </Typography>
      </span>
    ) }{ sessionStorage.getItem('designation') === 'teacher' && (
      <div className="mt-4 flex justify-end">
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            fontSize: "16px",
            backgroundColor: "rgba(124, 58, 237, 1)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(99, 39, 209, 1)" },
            px: 4,
            py: 1.5,
            borderRadius: "10px",
            textTransform: "none",
          }}
        >
          Back
        </Button>
      </div>
    )}
        </div>
      </Card>
    </div>
  );
}
