import { useState } from "react";
import {
  TextField,
  Divider,
  CircularProgress,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserProfile, LoginAPI, RegisterAPI } from "./services/api";
import { storeUserData } from "./services/storage";
import { isAuthenticated } from "./services/auth";
import { VisibilityIcon, VisibilityOffIcon } from "../assets/icons";
import { GoogleSignIn } from "../assets/google";

export default function Forms({ formAttributes }) {
  const navigate = useNavigate();
  const location = useLocation();
  const designationValue = sessionStorage.getItem('designation');

  const initialStateErrors = {
    name: { required: false },
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [load, setLoad] = useState(false);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [visibility, setVisibility] = useState(false);

  const textFieldStyles = {
    width: "100%",
    maxWidth: "450px",
    "& .MuiFilledInput-root.Mui-focused:after": {
      borderBottomColor: "var(--color-violet-900)",
      borderBottomWidth: "2px",
    },
    "& label.Mui-focused": { color: "var(--color-violet-900)" },
    "& .MuiFilledInput-input": { fontSize: "1.1rem" },
    "& .MuiInputLabel-root": { fontSize: "1.1rem" },
  };

  const passwordAttribute = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisibility(!visibility)}>
          {visibility ? (
            <VisibilityOffIcon
              sx={{ outline: "none", "&:focus": { outline: "none" }, "&:hover": { backgroundColor: "transparent" } }}
            />
          ) : (
            <VisibilityIcon />
          )}
        </IconButton>
      </InputAdornment>
    ),
  };

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const saveStudentToBackend = async (registerNumber, name, studentClass, section) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/store_student_info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          registerNumber,
          class: studentClass,
          section,
        }),
      });
      if (!res.ok) throw new Error("Failed to save student info");
      const data = await res.json();
      console.log("✅ Student info saved:", data);
    } catch (err) {
      console.error("❌ Error saving student info:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    let errors = { ...initialStateErrors };

    // Basic validation
    if (inputs.name === "" && location.pathname.includes("/register")) {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    // ✅ Student Register Number validation
    let registerNumber = "";
    if (designationValue === "student") {
      registerNumber = inputs.email.trim().toUpperCase();
      const regex = /^7376(0[1-9]|1[0-2])[A-E](0[1-9]|[1-9][0-9])$/;
      if (!regex.test(registerNumber)) {
        errors.custom_error = "Invalid Register Number";
        hasError = true;
      }
      sessionStorage.setItem("registerNumber", registerNumber);
    }

    if (hasError) {
      setErrors(errors);
      setLoad(false);
      return;
    }

    let modifiedInputs = { ...inputs };
    if (designationValue === "student") {
      modifiedInputs.email = modifiedInputs.email + "@gmail.com";
    }

    // =====================
    // Register API
    // =====================
    if (location.pathname.includes("/register")) {
      RegisterAPI(modifiedInputs)
        .then(async (res) => {
          storeUserData(res.data.idToken);

          // Save to backend if student
          if (designationValue === "student") {
            const name = inputs.name;
            const studentClass = registerNumber.slice(4, 6);
            const section = registerNumber.slice(6, 7);
            await saveStudentToBackend(registerNumber, name, studentClass, section);
          }
        })
        .catch((err) => {
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setErrors({ ...errors, custom_error: "User Already Exists" });
          } else if (err.response.data.error.message.includes("WEAK_PASSWORD")) {
            setErrors({ ...errors, custom_error: "Password should at least be 6 characters!" });
          }
        })
        .finally(() => setLoad(false));
    }

    // =====================
    // Login API
    // =====================
    if (location.pathname.includes("/login")) {
      LoginAPI(modifiedInputs)
        .then((res) => {
          storeUserData(res.data.idToken);
          return fetchUserProfile(res.data.idToken);
        })
        .then(async (profileRes) => {
          const displayName = profileRes.data.users[0].displayName;
          sessionStorage.setItem("username", displayName);

          // Save to backend if student
          if (designationValue === "student") {
            const studentClass = registerNumber.slice(4, 6);
            const section = registerNumber.slice(6, 7);
            await saveStudentToBackend(registerNumber, displayName, studentClass, section);
          }
        })
        .catch((err) => {
          if (err.response.data.error.message.includes("INVALID")) {
            setErrors({
              ...errors,
              custom_error:
                designationValue === "teacher"
                  ? "Incorrect email or password!"
                  : "Incorrect register number or password!",
            });
          }
        })
        .finally(() => setLoad(false));
    }

    setErrors(errors);
  };

  // ✅ Redirect if already logged in
  if (isAuthenticated()) {
    navigate(sessionStorage.getItem('designation') === "student" ? "/studentprofile" : "/dashboard");
  }

  return (
    <div className=" w-full max-w-[750px] flex flex-col gap-10 justify-center items-center h-screen">
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-[4em] leading-[1.1] text-violet-900">{formAttributes[0].head}</h1>
        <Divider
          sx={{
            borderBottomWidth: "5px",
            borderColor: "var(--color-violet-900)",
            borderRadius: "5px",
          }}
          className="w-20"
        />
      </div>

      <form className="flex flex-col gap-8 items-center">
        {formAttributes[0].inputAttributes.map((field, index) => (
          <TextField
            key={index}
            error={errors[field.name].required}
            label={
              <span className="flex items-center gap-5">
                {field.icon} {field.label}
              </span>
            }
            name={field.name}
            type={field.isPassword ? (visibility ? "text" : "password") : field.type}
            variant="filled"
            helperText={errors[field.name].required ? field.errorMessage : null}
            InputProps={field.isPassword ? passwordAttribute : {}}
            onChange={handleInput}
            sx={textFieldStyles}
          />
        ))}

        {errors.custom_error && <p className="text-lg text-red-500">{errors.custom_error}</p>}

        {!load ? (
          <Button
            type="submit"
            sx={{
              backgroundColor: "var(--color-violet-900)",
              fontSize: "20px",
              padding: "17px 185px",
              textAlign: "center",
              color: "#fff",
              cursor: "pointer",
              "&:hover": { backgroundColor: "var(--color-violet-500)" },
            }}
            onClick={(e) => {
              setLoad(true);
              handleSubmit(e);
            }}
          >
            {formAttributes[0]?.head ?? "Submit"}
          </Button>
        ) : (
          <span
              className={`flex justify-center items-center w-full py-3.5 px-6 ${
                location.pathname.includes("/register") ? "lg:px-52" : "lg:px-49"
              }  bg-white/10 border border-white/30 backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
            >
              <CircularProgress sx={{ color: " var(--color-violet-900)" }} />
            </span>
        )}
      </form>

      <div className="flex flex-col gap-3 items-center">
        <p className="text-xl text-black">
          {formAttributes[0].footerText}
          <a
            href={formAttributes[0].footerLink === "Login" ? "/designation/login" : "/designation/register"}
            className="text-violet-900 inline cursor-pointer text-xl"
          >
            {" "}
            {formAttributes[0].footerLink}
          </a>
        </p>

        {designationValue === "teacher" && (
          <>
            <p className="text-xl text-black">Or</p>
            <GoogleSignIn />
          </>
        )}
      </div>
    </div>
  );
}
