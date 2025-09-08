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
} from "@mui/material";

export function Forms({ onPredicted }) {
  const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:5000";

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
    // maxWidth: "450px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)",
      borderWidth: "2px",
    },
    "& label.Mui-focused": {
      color: "var(--color-violet-900)",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "1.2rem", // Input text
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

  const CheckboxStyles = {
    // color: "var(--color-violet-900)",
    "&.Mui-checked": {
      color: "var(--color-violet-900)",
    },
  };

  const selectStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)", // default outline color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)", // on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-violet-900)", // on focus
    },
  };

  return (
    <div className="flex flex-col  m-7 bg-white shadow-md rounded-lg">
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

        <div className="flex  justify-around">
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
            <InputLabel
              sx={{
                  "&.Mui-focused": {
                      color: "var(--color-violet-900)", // color when focused
                    },
                }}
                >
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
                {/* <TextField
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
              /> */}
          {/* <FormControlLabel control={<Checkbox checked={inputs.Sports} onChange={(e) => setField("Sports", e.target.checked)} sx={{
                    // color: "var(--color-violet-900)",
                    "&.Mui-checked": {
                        color: "var(--color-violet-900)",
                        },
                        }}/>} label="Sports" />
                        <FormControlLabel control={<Checkbox checked={inputs.Tuition} onChange={(e) => setField("Tuition", e.target.checked)} sx={{
                            // color: "var(--color-violet-900)",
                            "&.Mui-checked": {
                                color: "var(--color-violet-900)",
                                },
                    }}/>} label="Tuition" /> */}
          {/* <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Parents Support
          <select value={inputs.Parents_Support} onChange={(e) => setField("Parents_Support", e.target.value)} style={{ padding: 8 }}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
            </label> */}
          {/* <FormControlLabel control={<Checkbox checked={inputs.Internet_Facility} onChange={(e) => setField("Internet_Facility", e.target.checked)} sx={{
                  // color: "var(--color-violet-900)",
                  "&.Mui-checked": {
                    color: "var(--color-violet-900)",
                  },
                }}/>} label="Internet Facility" /> */}
        </div>
      </div>

      <Button
        sx={{
          backgroundColor: "var(--color-violet-900)",
          fontSize: "25px",
          width: "full",
          padding: "20px ",
          textAlign: "center",
          color: "#fff",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "var(--color-violet-500)",
          },
        }}
        onClick={submit}
      >
        Predict
      </Button>
    </div>
  );
}
