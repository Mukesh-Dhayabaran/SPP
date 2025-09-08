// Dashboard.jsx
import React, { useState } from "react";
import { Button, Checkbox, TextField, FormControlLabel } from "@mui/material";

// API base: set VITE_API_BASE or default to localhost:5000
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";

export default function Dashboard() {
  const [mode, setMode] = useState("form"); // "form" or "result"
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: 20, fontFamily: "Inter, sans-serif" }}>
      <header style={{ background: "#5b21b6", color: "white", padding: 18, borderRadius: 8 }}>
        <h1 style={{ margin: 0 }}>Student Performance Predictor</h1>
      </header>

      {mode === "form" ? (
        <Forms onPredicted={(r) => { setResult(r); setMode("result"); }} />
      ) : (
        <Prediction result={result} onBack={() => setMode("form")} />
      )}
    </div>
  );
}

function Forms({ onPredicted }) {
  const [inputs, setInputs] = useState({
    Hours_Studied_Per_Week: "",
    Attendance: "",
    Previous_Exam_Percent: "",
    Failures: "",
    Sports: false,
    Tuition: false,
    Parents_Support: "Medium",
    Internet_Facility: false,
  });
  const [errors, setErrors] = useState({});

  const setField = (k, v) => setInputs((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (inputs.Hours_Studied_Per_Week === "") e.Hours_Studied_Per_Week = true;
    if (inputs.Attendance === "") e.Attendance = true;
    if (inputs.Previous_Exam_Percent === "") e.Previous_Exam_Percent = true;
    if (inputs.Failures === "") e.Failures = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    const payload = {
      Hours_Studied_Per_Week: Number(inputs.Hours_Studied_Per_Week),
      Attendance: Number(inputs.Attendance),
      Previous_Exam_Percent: Number(inputs.Previous_Exam_Percent),
      Failures: Number(inputs.Failures),
      Sports: inputs.Sports ? "Yes" : "No",
      Tuition: inputs.Tuition ? "Yes" : "No",
      Parents_Support: inputs.Parents_Support,
      Internet_Facility: inputs.Internet_Facility ? "Yes" : "No",
    };

    try {
      const resp = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error("Network error");
      const data = await resp.json();
      onPredicted(data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Make sure backend is running at " + API_BASE);
    }
  };

  return (
    <div style={{ marginTop: 20, background: "#fff", padding: 18, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <TextField
          label="Hours Studied Per Week"
          type="number"
          value={inputs.Hours_Studied_Per_Week}
          onChange={(e) => setField("Hours_Studied_Per_Week", e.target.value)}
          error={!!errors.Hours_Studied_Per_Week}
        />
        <TextField
          label="Attendance (%)"
          type="number"
          value={inputs.Attendance}
          onChange={(e) => setField("Attendance", e.target.value)}
          error={!!errors.Attendance}
        />
        <TextField
          label="Previous Exam Percent"
          type="number"
          value={inputs.Previous_Exam_Percent}
          onChange={(e) => setField("Previous_Exam_Percent", e.target.value)}
          error={!!errors.Previous_Exam_Percent}
        />
        <TextField
          label="Failures"
          type="number"
          value={inputs.Failures}
          onChange={(e) => setField("Failures", e.target.value)}
          error={!!errors.Failures}
        />
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 16, alignItems: "center" }}>
        <FormControlLabel control={<Checkbox checked={inputs.Sports} onChange={(e) => setField("Sports", e.target.checked)} />} label="Sports" />
        <FormControlLabel control={<Checkbox checked={inputs.Tuition} onChange={(e) => setField("Tuition", e.target.checked)} />} label="Tuition" />
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Parents Support
          <select value={inputs.Parents_Support} onChange={(e) => setField("Parents_Support", e.target.value)} style={{ padding: 8 }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <FormControlLabel control={<Checkbox checked={inputs.Internet_Facility} onChange={(e) => setField("Internet_Facility", e.target.checked)} />} label="Internet Facility" />
      </div>

      <div style={{ marginTop: 18 }}>
        <Button variant="contained" onClick={submit}>Predict</Button>
      </div>
    </div>
  );
}

function Prediction({ result, onBack }) {
  if (!result) return null;
  return (
    <div style={{ marginTop: 20, background: "#fff", padding: 18, borderRadius: 8 }}>
      <h2>Prediction Result</h2>
      <p style={{ fontSize: 36, margin: "12px 0" }}>{result.predicted_score} %</p>
      <p style={{ fontSize: 18 }}>Category: <strong>{result.category}</strong></p>
      <div style={{ marginTop: 12 }}>
        <Button variant="contained" onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}
