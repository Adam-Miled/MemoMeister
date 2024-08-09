import { Logout } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { styles } from "./UserMenu.styles";

function UserMenu(props) {
  const { handleMenuClose, menuAnchorEl, isUserMenuOpen, setIsAuthenticated } =
    props;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userProfileMinimal");
    setIsAuthenticated(false);
  };

  const handleOpenContactPage = () => {
    window.open(
      "https://memomeister.com/kontakt/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={menuAnchorEl}
        id="account-menu"
        open={isUserMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem 
        sx={styles.Wrapper}
        onClick={() => handleOpenContactPage()}>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          Kontaktiere uns
        </MenuItem>
        <Divider sx={{ m: "0 8px" }} />
        <MenuItem onClick={() => handleLogout()} sx={{margin:'0px 10px'}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Ausloggen
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserMenu;
