import { PersonIcon, EmailIcon ,AppRegistrationIcon, LockIcon } from "../../assets/icons";
import Forms from "../../authentication/forms";
import backImg from "../../assets/images/back_img.png";

export default function Register() {

    const designationValue = localStorage.getItem("designation");

  const textFiledAttributes = [
    {
      icon: <PersonIcon />,
      label: "Username",
      name: "name",
      type: "name",
      variant: "filled",
      errorMessage: "Username is required.",
      isPassword: false,
    },
    {
      icon: designationValue == "teacher" ? <EmailIcon /> : <AppRegistrationIcon/>,
      label: designationValue == "teacher" ? "Email" : "Register No" ,
      name: "email",
      type: "email",
      variant: "filled",
      errorMessage: designationValue == "teacher" ? "Email is required." : "Register No is required.",
      isPassword: false,
    },
    {
      icon: <LockIcon />,
      label: "Password",
      name: "password",
      type: "password",
      variant: "filled",
      errorMessage: "Password is required.",
      isPassword: true,
    },
  ];

  const registerAttributes = [
    {
      head: "Sign Up",
      footerText: "Already have an account?",
      footerLink: "Login",
      inputAttributes: textFiledAttributes,
    },
  ];

  return (
    <div className="flex flex-row justify-center bg-[#F3F1F2] h-screen">
      <img src={backImg} className="" />
      <Forms formAttributes={registerAttributes} />
    </div>
  );
}
