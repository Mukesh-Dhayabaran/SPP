import { Button } from "@mui/material";
import { auth, provider,signInWithPopup } from "../authentication/firebase";
import { useNavigate } from "react-router-dom";
import { storeUserData } from "../authentication/services/storage";

export const GoogleSignIn = () => {

  const navigate = useNavigate();

    const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      storeUserData(result.user.accessToken);
      navigate("/dashboard");
    });
  };
  
  return (
    <Button
            sx={{
              color: "black",
              textTransform: "none",
              fontSize: "19px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              paddingRight: "15px",
              "&:hover": {
                backgroundColor: "#DFDDDD",
              },
            }}
            onClick={handleGoogleSignIn}
          >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 256 262"
        className="h-[40px] w-[40px] p-[8px]"
      >
        <title>Google Icon</title>
        <path
          fill="#4285F4"
          d="M255.9 133.2c0-9.4-.8-18.7-2.5-27.8H130v52.7h70.8c-3.1 16.8-12.5 31.1-26.7 40.6v33h43.2c25.4-23.4 38.6-57.8 38.6-98.5z"
          />
        <path
          fill="#34A853"
          d="M130 261c35.1 0 64.6-11.6 86.1-31.6l-43.2-33c-12 8.1-27.4 12.7-42.9 12.7-33 0-61-22.3-71-52.3H15.8v32.9C36.9 231.7 80.8 261 130 261z"
          />
        <path
          fill="#FBBC05"
          d="M59 156.7c-3.7-11.1-5.8-22.9-5.8-35s2.1-23.9 5.8-35v-32.9H15.8C5.6 82.4 0 105.7 0 130s5.6 47.6 15.8 67.3L59 156.7z"
        />
        <path
          fill="#EA4335"
          d="M130 51.6c18.9 0 35.9 6.5 49.3 19.2l37.1-37.1C194.6 11.3 165.1 0 130 0 80.8 0 36.9 29.3 15.8 74.2L59 107c10-30 38-52.3 71-52.3z"
        />
      </svg>
          Sign in with Google
        </Button>
  );
};
