import React, { useState } from "react";
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import { LogoutIcon } from "../../../assets/icons";
import { removeUserData } from "../../../authentication/services/storage";
import { auth } from "../../../authentication/firebase";
import { useNavigate } from "react-router-dom";

export default function ProfileCircle() {
  const navigate = useNavigate();
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
          bgcolor: "white",
          color: "var(--color-violet-900)",
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
      >
        <div className="p-3">
          <Typography>{username}</Typography>
          <p className="text-gray-500">
            {designationValue ? designationValue.charAt(0).toUpperCase() + designationValue.slice(1) : ""}
          </p>
        </div>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            auth.signOut();
            removeUserData();
            sessionStorage.clear();
            navigate("/");
          }}
          sx={{ display: "flex", alignItems: "center", gap: "5px", padding: "10px", marginTop: "8px" }}
        >
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}