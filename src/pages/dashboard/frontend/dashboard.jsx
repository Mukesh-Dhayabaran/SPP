// Dashboard.jsx
import React, { useState } from "react";
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material";
import { Forms } from "./forms";
import { Prediction } from "./prediction";

// API base: set VITE_API_BASE or default to localhost:5000

export default function Dashboard() {
  const [mode, setMode] = useState("form"); // "form" or "result"
  const [result, setResult] = useState(null);

  return (
    <div className="text-center" >
        <h1 className="bg-violet-900 font-bold text-6xl text-white p-12 rounded-b-4xl">Student Performance Predictor</h1>

      {mode === "form" ? (
        <Forms onPredicted={(r) => { setResult(r); setMode("result"); }} />
      ) : (
        <Prediction result={result} onBack={() => setMode("form")} />
      )}
    </div>
  );
}



