import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import { isAuthenticated } from "../../../authentication/services/auth";
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import ProfileCircle from "./profileCircle";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [registerNumber, setRegisterNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, _setLoading] = useState(false);

  if (!isAuthenticated()) {
    navigate("/designation/login");
  }

  const handleViewProfile = () => {
    if (!registerNumber) {
      setError("Please enter a register number");
      return;
    }
    sessionStorage.setItem("registerNumber", registerNumber);
    navigate('/studentprofile');
  };

  const handleEnterMarks = () => {
    if (!registerNumber) {
      setError("Please enter a register number");
      return;
    }
    sessionStorage.setItem("registerNumber", registerNumber);
    navigate('/prediction-page');
  };

  const textFieldStyles = {
    mb:6,
    width: "100%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)",
      borderWidth: "2px",
    },
    "& label.Mui-focused": {
      color: "var(--color-violet-900)",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: "60px",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 flex flex-col items-center py-16 px-6">
       <div className="absolute top-6 right-10">
    <ProfileCircle />
  </div>
      {/* Header */}
      <Box className="mb-12 text-center">
        <SchoolIcon sx={{ fontSize: 100, color: "#7C3AED" }} />
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#5B21B6", mt: 2 }}>
          Welcome, {sessionStorage.getItem("username")}
        </Typography>
        <Typography variant="h6" sx={{ color: "#4B0082", mt: 1, maxWidth: 600, mx: "auto" }}>
          Manage your students efficiently. View profiles or enter marks to calculate performance.
        </Typography>
      </Box>

      {/* Main Cards */}
      <Box
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Info Panel */}
        <Card
          sx={{
            bgcolor: "#7C3AED",
            color: "#fff",
            borderRadius: 6,
            p: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          <InfoIcon sx={{ fontSize: 60, mb: 3 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            Teacher Tips
          </Typography>
          <Divider sx={{ bgcolor: "#fff", mb: 4, mx: 10 }} />
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            • Ensure the Register Number is accurate to fetch the correct student data.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            • You can view student profiles or quickly calculate performance percentages.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            • Keep your data updated regularly for better predictions.
          </Typography>
        </Card>

        {/* Actions Panel */}
        <Card
          sx={{
            bgcolor: "#fff",
            borderRadius: 6,
            p: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#7C3AED", mb: 5, textAlign: "center" }}>
            Choose an Action
          </Typography>

          <TextField
            label="Enter Student Register Number"
            variant="outlined"
            value={registerNumber}
            onChange={(e) => {
              setRegisterNumber(e.target.value.toUpperCase());
              setError("");
            }}
            fullWidth
            sx={textFieldStyles}
            helperText={error}
            error={!!error}
          />

          <Box className="flex flex-col md:flex-row gap-6 justify-center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<InfoIcon />}
              onClick={handleViewProfile}
              sx={{
                px: 8,
                py: 2.5,
                fontWeight: "bold",
                textTransform: "none",
                bgcolor: "#7C3AED",
                "&:hover": { bgcolor: "#5B21B6" },
              }}
            >
              View Student Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AssignmentIcon />}
              onClick={handleEnterMarks}
              sx={{
                px: 8,
                py: 2.5,
                fontWeight: "bold",
                textTransform: "none",
                borderColor: "#7C3AED",
                color: "#7C3AED",
                "&:hover": { backgroundColor: "#ede9fe" },
              }}
            >
              Enter Marks & Calculate
            </Button>
          </Box>

          {loading && (
            <Box className="mt-6 flex justify-center">
              <CircularProgress sx={{ color: "#7C3AED" }} />
            </Box>
          )}
        </Card>
      </Box>
    </div>
  );
}
