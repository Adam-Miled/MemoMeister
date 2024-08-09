import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import backgroundImage from "../../Assets/landingPageBackground.jpg";
import Logo from "../../Assets/Logo";
import image from "../../Assets/memomeister-logo.svg";
import { styles } from "./LandingPage.styles";
import { fetchUserProfileMinimal } from "../../Utilities/ProfileUtilities";

const PASSWORD = process.env.REACT_APP_PASSWORD;

const LandingPage = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
        if (password === PASSWORD) {
            await fetchUserProfileMinimal();
            setErrorMessage("");
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", "true");
        } else {
            setErrorMessage("Password is incorrect.");
            localStorage.setItem("isAuthenticated", "false");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <Box
      sx={{
        ...styles.FullScreenDiv,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Box sx={styles.Overlay} />
      <img src={image} alt="MemoMeisterLogo" style={styles.PageMarker} />
      <Box sx={styles.standardBox}>
        <Box>
          <Logo />
          <Typography
            sx={{ fontWeight: 600, fontSize: "18px", color: "#0e6adb" }}
          >
            MemoMeister
          </Typography>
          <Typography
            sx={{ fontWeight: 600, fontSize: "18px", color: "#0e6adb" }}
          >
            Programmier-Herausforderung
          </Typography>
        </Box>
        <TextField
          sx={styles.inputField}
          type="password"
          variant="outlined"
          fullWidth
          label="Passwort"
          placeholder="Geben Sie Ihr Passwort ein"
          value={password}
          onChange={handlePasswordChange}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || password.trim() === ""}
          sx={
            loading || password.trim() === ""
              ? {
                  ...styles.outlineButton,
                  cursor: "default",
                  "&:disabled": {
                    border: "2px solid rgba(14, 106, 219, 0.5)",
                    color: "rgba(14, 106, 219, 0.5)",
                  },
                }
              : styles.outlineButton
          }
        >
          {loading ? <CircularProgress size={24} /> : "Anmelden"}
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
