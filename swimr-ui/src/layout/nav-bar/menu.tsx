import * as React from "react";
import { Menu, IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useTokens from "../../hooks/useTokens";

export default function AppBarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { clearLocalStorageTokens } = useTokens();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    clearLocalStorageTokens();
    window.location.reload();
  };
  return (
    <>
      <IconButton
        id="basic-button"
        size="large"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
