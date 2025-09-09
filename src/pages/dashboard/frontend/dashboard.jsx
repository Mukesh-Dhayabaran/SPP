// Dashboard.jsx
import React, { useState } from "react";
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material";
import { Forms } from "./forms";
import { Prediction } from "./prediction";
import ProfileCircle from "./profileCircle";

// API base: set VITE_API_BASE or default to localhost:5000

export default function Dashboard() {

  
  const [mode, setMode] = useState("form"); // "form" or "result"
  const [result, setResult] = useState(null);
  

  return (
    <div className="text-center" >

      <div className="flex gap-40 justify-end items-center bg-violet-900 rounded-b-4xl p-12">

        <h1 className=" font-bold text-6xl text-white ">Student Performance Predictor</h1>
        <ProfileCircle/>

        </div>


      {mode === "form" ? (
        <Forms onPredicted={(r) => { setResult(r); setMode("result"); }} />
      ) : (
        <Prediction result={result} onBack={() => setMode("form")} />
      )}
    </div>
  );
}



