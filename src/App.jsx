import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/frontend/dashboard";
import Designation from "./pages/home/designation";
import StudentProfile from "./pages/dashboard/frontend/studentProfile";
import TeacherDashboard from "./pages/dashboard/frontend/teacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/designation" element={<Designation />} />
      <Route path="/designation/register" element={<Register />} />
      <Route path="/designation/login" element={<Login />} />
      <Route path="/studentprofile" element={<StudentProfile />} />
      <Route path="/dashboard" element={<TeacherDashboard />} />
      <Route path="/prediction-page" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
