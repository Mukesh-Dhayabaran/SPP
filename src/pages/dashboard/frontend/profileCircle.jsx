import React, { useState } from "react";
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { LogoutIcon } from "../../../assets/icons";
import { removeUserData } from "../../../authentication/services/storage";
import { auth } from "../../../authentication/firebase";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileCircle() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = sessionStorage.getItem("username");
  const designationValue = sessionStorage.getItem("designation");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box>
      <Avatar
        onClick={handleClick}
        sx={{
          ...(location?.pathname === "/dashboard" ? { bgcolor: "var(--color-violet-900)",
          color: "white" } : { bgcolor: "white",
          color: "var(--color-violet-900)" }),
          width: 70,
          height: 70,
          fontSize: "2rem",
          fontWeight: "medium",
          cursor: "pointer",
        }}
      >
        {username?.charAt(0).toUpperCase()}
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 , ml:3,display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center' }}
      >
        <div className="p-3 text-center">
          <Typography>{username}</Typography>
          <p className="text-gray-500">
            {designationValue ? designationValue.charAt(0).toUpperCase() + designationValue.slice(1) : ""}
          </p>
        </div>
        <Divider />
        <div className="p-1">

        {location?.pathname !== "/dashboard" &&
        <>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(designationValue === "student" ? "/studentprofile" : "/dashboard");
          }}
          sx={{ display: "flex", alignItems: "center",justifyContent:"center", gap: "5px", paddingX: "7px", marginTop: "8px" }}
          // sx={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px" }}
          >
          Profile
        </MenuItem>
       <Divider sx={{marginLeft:"5px",marginRight:"5px"}}/>
          </>
       }

        <MenuItem
          onClick={() => {
            handleClose();
            auth.signOut();
            removeUserData();
            sessionStorage.clear();
            navigate("/");
          }}
          sx={{ display: "flex", alignItems: "center",justifyContent:"center", gap: "5px", padding: "7px", marginTop: "8px" }}
          >
          <LogoutIcon />
          Sign Out
        </MenuItem>
            </div>
      </Menu>
    </Box>
  );
}