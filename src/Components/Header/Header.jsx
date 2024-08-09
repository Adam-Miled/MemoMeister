import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./Header.styles";
import Logo from "../../Assets/memomeister-logo.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UserMenu from "../UserMenu/UserMenu";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

function Header({ setIsAuthenticated, toggleSidebar }) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const isUserMenuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenWebsite = () => {
    window.open("https://memomeister.com/", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("userProfileMinimal");
    if (storedUserProfile) {
      const parsedUserProfile = JSON.parse(storedUserProfile);
      setUserInfo(parsedUserProfile.me);
    }
  }, []);

  return (
    <Box sx={styles.Wrapper}>
      <Box>
        <MenuIcon sx={styles.MenuButton} onClick={toggleSidebar} />
        <Link to="/">
          <img src={Logo} alt="MemoMeisterLogo" style={styles.Logo} />
        </Link>
      </Box>
      <Box>
        <Box sx={styles.ProfileBox}>
          <Tooltip
            key={"websiteTooltip"}
            title={"Visit Website"}
            placement="bottom"
            arrow
          >
            <OpenInBrowserIcon
              sx={{ color: "white", cursor: "pointer", marginRight: "7px" }}
              onClick={() => handleOpenWebsite()}
            />
          </Tooltip>
          <Box
            sx={{ ...styles.ProfileBox, cursor: "pointer" }}
            onClick={handleMenuClick}
          >
            {userInfo ? (
              <img
                src={userInfo.avatar}
                alt="User Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : (
              <AccountCircleIcon fontSize="medium" sx={{ color: "white" }} />
            )}
            <IconButton
              id="Avatar"
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              sx={styles.profileIconButton}
            >
              <Typography sx={styles.ProfileTitle}>
                {userInfo ? userInfo.fullName : "User Name"}
              </Typography>
              <KeyboardArrowDownIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <UserMenu
            setIsAuthenticated={setIsAuthenticated}
            handleMenuClose={handleMenuClose}
            menuAnchorEl={menuAnchorEl}
            isUserMenuOpen={isUserMenuOpen}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
