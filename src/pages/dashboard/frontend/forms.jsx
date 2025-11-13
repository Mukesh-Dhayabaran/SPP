import { useState } from "react";
import {
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Forms({ onPredicted }) {
  const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";

  const navigate = useNavigate(); 

  const registerNumber = sessionStorage.getItem("registerNumber");
  const designationValue = sessionStorage.getItem("designation"); // student or teacher

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    const payload = {
      Roll_Number: registerNumber,
      Hours_Studied_Per_Week: Number(inputs.Hours_Studied_Per_Week),
      Attendance: Number(inputs.Attendance),
      Previous_Exam_Percent: Number(inputs.Previous_Exam_Percent),
      Failures: Number(inputs.Failures),
      Sports: inputs.Sports ? "Yes" : "No",
      Tuition: inputs.Tuition ? "Yes" : "No",
      Parents_Support: inputs.Parents_Support,
      Internet_Facility: inputs.Internet_Facility ? "Yes" : "No",
      designation: designationValue || "student",
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

      alert(data.message || "Prediction done successfully!");
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Make sure backend is running at " + API_BASE);
    } finally {
      setLoading(false);
    }
  };

  const textFieldAttributeds = [
    {
      label: "Hours Studied Per Week",
      name: "Hours_Studied_Per_Week",
      type: "number",
      value: inputs.Hours_Studied_Per_Week,
      error: errors.Hours_Studied_Per_Week,
    },
    {
      label: "Attendance (%)",
      name: "Attendance",
      type: "number",
      value: inputs.Attendance,
      error: errors.Attendance,
    },
    {
      label: "Previous Exam Percent",
      name: "Previous_Exam_Percent",
      type: "number",
      value: inputs.Previous_Exam_Percent,
      error: errors.Previous_Exam_Percent,
    },
    {
      label: "Failures",
      name: "Failures",
      type: "number",
      value: inputs.Failures,
      error: errors.Failures,
    },
  ];

  const textFieldStyles = {
    width: "100%",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)",
      borderWidth: "2px",
    },
    "& label.Mui-focused": {
      color: "var(--color-violet-900)",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "1.2rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.2rem",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: "60px",
      fontSize: "1.3rem",
      padding: "8px",
    },
  };

  const CheckboxAttributes = ["Sports", "Tuition", "Internet_Facility"];
  const CheckboxStyles = { "&.Mui-checked": { color: "var(--color-violet-900)" } };
  const selectStyles = { "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--color-violet-900)" } };

  return (
    <div className="flex flex-col m-7 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-16 p-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          {textFieldAttributeds.map((attr, index) => (
            <TextField
              key={index}
              required
              label={attr.label}
              type={attr.type}
              value={attr.value}
              onChange={(e) => setField(attr.name, e.target.value)}
              error={!!attr.error}
              helperText={attr.error ? `This field is required.` : ""}
              sx={textFieldStyles}
            />
          ))}
        </div>

        <div className="flex justify-around">
          {CheckboxAttributes.map((attr, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={inputs[attr]}
                  onChange={(e) => setField(attr, e.target.checked)}
                  sx={CheckboxStyles}
                />
              }
              label={attr.replace(/_/g, " ")}
            />
          ))}

          <FormControl>
            <InputLabel sx={{ "&.Mui-focused": { color: "var(--color-violet-900)" } }}>
              Parents Support
            </InputLabel>
            <Select
              label="Parents Support"
              value={inputs.Parents_Support}
              onChange={(e) => setField("Parents_Support", e.target.value)}
              sx={{ minWidth: 200, ...selectStyles }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
<div className="flex flex-row items-center justify-center">

          <Button
          sx={{
            // backgroundColor: "var(--color-violet-900)",
            color: "var(--color-violet-900)",
            margin: "0px 20px 20px 20px",
            border:"2px solid var(--color-violet-900)",
            borderRadius: "10px",
            fontSize: "25px",
            width: "full",
            padding: "20px 300px",
            textAlign: "center",
            textTransform: "none",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": { backgroundColor: "var(--color-violet-900)" ,
            color: "white"},
          }}
          onClick={navigate.bind(this, designationValue === "student" ? "/studentprofile" : "/dashboard")}>
            Back
          </Button>
      <Button
        sx={{
          backgroundColor: "var(--color-violet-900)",
          color: "white",
          border:"2px solid var(--color-violet-900)",
          textTransform: "none",
          margin: "0px 20px 20px 20px",
          borderRadius: "10px",
          fontSize: "25px",
          width: "full",
          padding: "20px 300px",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": { backgroundColor: "white" ,color: "var(--color-violet-900)"},
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={submit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={44} sx={{ color: "#fff" }} /> : "Predict"}
      </Button>
        </div>
    </div>
  );
}
